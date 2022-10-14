import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUniversityDto } from './dto/create-university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto';
import { HttpService } from '@nestjs/axios'
import { University } from './interfaces/university.interface';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose"
import { UniversityGet } from './interfaces/university.get.interface';
import { IsEmpty, isNotEmptyObject, IsNotEmptyObject } from 'class-validator';

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
          if (foundUniversity) {
            continue
          }
          const createdUniversities = await this.universityModel.insertMany(universities)
        }
      }
    }
    return null
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

  create(createUniversityDto: CreateUniversityDto) {
    return 'This action adds a new university';
  }

  async findOne(id: string) {
    try{
      const foundUniversity = await this.universityModel.findOne({ _id: id })
      return foundUniversity
    }catch{
      throw new NotFoundException(`university with id ${id} not found`)
    } 
  }

  update(id: number, updateUniversityDto: UpdateUniversityDto) {
    return `This action updates a #${id} university`;
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
