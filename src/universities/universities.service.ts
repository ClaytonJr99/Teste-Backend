import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateUniversityDto } from './dto/create-university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto';
import { HttpService } from '@nestjs/axios'
import { Config, University } from './interfaces/university.interface';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose"
import { UniversityGet } from './interfaces/university.get.interface';
import { IsEmpty, isNotEmptyObject, IsNotEmptyObject } from 'class-validator';

@Injectable()
export class UniversitiesService {

  constructor(
    @InjectModel('University') 
    private readonly universityModel: Model<University>,
    @InjectModel('Config') 
    private readonly configModel: Model<Config>, 
    private readonly httpService: HttpService) { }

  async getUniversities() {
    const databaseIsLoaded = await this.configModel.findOne({ database_loaded: true });
    if (databaseIsLoaded) {
      throw new BadRequestException()
    }

    const countries = ["suriname", "uruguay"]
    let universities = []

    for (let countrie of countries) {
      let url = `http://universities.hipolabs.com/search?country=${countrie}`
      const { status, data } = await this.httpService.get(url).toPromise()

      if (status != 200) {
        throw new BadRequestException()
      }

      universities = [...universities, ...data]
    }

    await this.universityModel.insertMany(universities)
    await this.configModel.create({ database_loaded: true })

    return universities
  }

  async findAll(options: UniversityGet) {

    if(options.country){
      if (isNotEmptyObject(options)) {
        let skip = options.limit * (options.page - 1)
        let str = options.country
        let country = str[0].toUpperCase() + str.substr(1);
            
            return await this.universityModel
              .find({country})
              .skip(skip)
              .limit(Number(options.limit))
              .exec();
          }
          else {
            let page = 1;
            let limit = 4;
            let skip = limit * (page - 1)
      
            return await this.universityModel
              .find()
              .skip(skip)
              .limit(Number(limit))
              .exec();
          }
    }else{
      if (isNotEmptyObject(options)) {
        let skip = options.limit * (options.page - 1)
        return await this.universityModel
          .find()
          .skip(skip)
          .limit(Number(options.limit))
          .exec();
      }
      else {
        let page = 1;
        let limit = 20;
        let skip = limit * (page - 1)
  
        return await this.universityModel
          .find()
          .skip(skip)
          .limit(Number(limit))
          .exec();
      }
    }
  }

  async create(createUniversityDto: CreateUniversityDto) {
    createUniversityDto.country = createUniversityDto.country[0].toUpperCase() + createUniversityDto.country.substr(1);
    console.log(createUniversityDto.country);
    
    const foundUniversity = await this.universityModel.findOne({ country: createUniversityDto.country, stateProvince: createUniversityDto.stateProvince, name: createUniversityDto.name }).exec()

    if(foundUniversity){
      console.log(foundUniversity);
      throw new BadRequestException('University already registered');
    }else{
      const createdUniversity = new this.universityModel(createUniversityDto);
      return await createdUniversity.save();
    }
  }

  async findOne(id: string) {
    try{
      const foundUniversity = await this.universityModel.findOne({ _id: id })
      return foundUniversity
    }catch{
      throw new NotFoundException(`university with id ${id} not found`)
    } 
  }

  async update(id: string, updateUniversityDto: UpdateUniversityDto) {
    try{
      await this.universityModel.findOneAndUpdate({ _id: id }, {$set: updateUniversityDto}).exec();
      return{ message: `University with id: ${id} successfully updated` }
    }catch{
      throw new NotFoundException(`university with id ${id} not found`)
    }
  }

  async remove(id: string) {
    try{
      await this.universityModel.deleteOne({ _id: id }).exec();
      return {message: `university with id ${id} was deleted successfully`}
    }catch{
      throw new NotFoundException(`university with id ${id} not found`)
    }
  }
}
