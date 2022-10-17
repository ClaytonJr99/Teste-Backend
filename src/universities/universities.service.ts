import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateUniversityDto } from './dto/create-university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto';
import { HttpService } from '@nestjs/axios';
import { Config, University } from './interfaces/university.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UniversityDto } from './dto/transform-university.dto';

@Injectable()
export class UniversitiesService {
  constructor(
    @InjectModel('University')
    private readonly universityModel: Model<University>,
    @InjectModel('Config')
    private readonly configModel: Model<Config>,
    private readonly httpService: HttpService,
  ) {}

  async getUniversities() {
    const databaseIsLoaded = await this.configModel.findOne({
      database_loaded: true,
    });
    if (databaseIsLoaded) {
      throw new BadRequestException('database is already populated');
    }

    const countries = [
      'argentina',
      'brasil',
      'chile',
      'colombia',
      'paraguai',
      'peru',
      'suriname',
      'uruguay',
    ];

    let universitiesResponse: UniversityDto[] = [];

    for (let countrie of countries) {
      let url = `http://universities.hipolabs.com/search?country=${countrie}`;
      const { status, data } = await this.httpService.get(url).toPromise();

      if (status != 200) {
        throw new BadRequestException();
      }

      universitiesResponse = [...universitiesResponse, ...data];
    }

    const universities = universitiesResponse.map((x) => ({
      alphaTwoCode: x.alpha_two_code,
      webPages: x.web_pages,
      name: x.name,
      country: x.country,
      domains: x.domains,
      stateProvince: x['state-province'],
    }));

    const saved = await this.universityModel.insertMany(universities);
    await this.configModel.create({ database_loaded: true });

    return saved;
  }

  async findAll({ page = 1, limit = 20, country }) {
    let regex = country
      ? { country: new RegExp('^' + country + '$', 'i') }
      : {};
    let skip = limit * (page - 1);
    return await this.universityModel
      .find(regex, 'name country stateProvince')
      .skip(skip)
      .limit(limit)
      .exec();
  }

  async create(createUniversityDto: CreateUniversityDto) {
    createUniversityDto.country =
      createUniversityDto.country[0].toUpperCase() +
      createUniversityDto.country.substr(1);

    const foundUniversity = await this.universityModel
      .findOne({
        country: createUniversityDto.country,
        stateProvince: createUniversityDto.stateProvince,
        name: createUniversityDto.name,
      })
      .exec();

    if (foundUniversity) {
      throw new BadRequestException('University already registered');
    } else {
      const createdUniversity = new this.universityModel(createUniversityDto);
      let returnedValue = await createdUniversity.save();

      let { alphaTwoCode, webPages, name, country, domains, stateProvince } =
        returnedValue;

      return {
        alphaTwoCode,
        webPages,
        name,
        country,
        domains,
        stateProvince,
      };
    }
  }

  async findOne(id: string) {
    try {
      const foundUniversity = await this.universityModel.findOne(
        { _id: id },
        '-__v',
      );
      return foundUniversity;
    } catch {
      throw new NotFoundException(`university with id ${id} not found`);
    }
  }

  async update(id: string, updateUniversityDto: UpdateUniversityDto) {
    try {
      await this.universityModel
        .updateOne({ _id: id }, { $set: updateUniversityDto })
        .exec();
      return { message: `University with id: ${id} successfully updated` };
    } catch {
      throw new NotFoundException(`university with id ${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      await this.universityModel.deleteOne({ _id: id }).exec();
      return { message: `university with id ${id} was deleted successfully` };
    } catch {
      throw new NotFoundException(`university with id ${id} not found`);
    }
  }
}
