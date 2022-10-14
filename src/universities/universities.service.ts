import { Injectable } from '@nestjs/common';
import { CreateUniversityDto } from './dto/create-university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto';
import { HttpService } from '@nestjs/axios'
import { University } from './interfaces/university.interface';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose"

@Injectable()
export class UniversitiesService {

  constructor(@InjectModel('University') private readonly universityModel: Model<University>, private readonly httpService: HttpService) { }

  async getUniversities() {

    const countries = ["suriname", "uruguay"]

    let universities: Array<CreateUniversityDto> = []

    for (let countrie of countries) {

      let url = `http://universities.hipolabs.com/search?country=${countrie}`

      const { status, data } = await this.httpService.get(url).toPromise()

      if (status == 200) {

        universities = data

        for (let i = 0; i < universities.length; i++) {
          const foundUniversity = await this.universityModel.findOne({ country: universities[i].country, stateProvince: universities[i].stateProvince, name: universities[i].name }).exec()
          console.log(foundUniversity);
          if (foundUniversity) {
              continue
          }
          const createdUniversities = await this.universityModel.insertMany(universities)
        }
      }
    }
    return null
  }

  async findAll() {
    // return await this.universityModel.find().exec();
    return "teste"
  }

  create(createUniversityDto: CreateUniversityDto) {
    return 'This action adds a new university';
  }

  findOne(id: number) {
    return `This action returns a #${id} university`;
  }

  update(id: number, updateUniversityDto: UpdateUniversityDto) {
    return `This action updates a #${id} university`;
  }

  remove(id: number) {
    return `This action removes a #${id} university`;
  }
}
