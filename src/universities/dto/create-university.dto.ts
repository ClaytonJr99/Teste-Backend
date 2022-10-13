import {IsNotEmpty, IsString, Min, Max, IsArray,  } from 'class-validator'

export class CreateUniversityDto {

    @IsNotEmpty()
    @IsString()
    @Min(2)
    @Max(2)
    alpha_two_code: string

    @IsNotEmpty()
    @IsArray()
    web_pages: Array<string>

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    country: string

    @IsNotEmpty()
    @IsArray()
    domains: Array<string>

    @IsString()
    stateProvince: string
}
