import { PartialType } from '@nestjs/mapped-types';
import { CreateUniversityDto } from './create-university.dto';
import {IsNotEmpty, IsString, IsArray,  } from 'class-validator'

export class UpdateUniversityDto extends PartialType(CreateUniversityDto) {

    @IsArray()
    webPages: Array<string>

    @IsNotEmpty()
    @IsString()
    name:string

    @IsNotEmpty()
    @IsArray()
    domains: Array<string>
}
