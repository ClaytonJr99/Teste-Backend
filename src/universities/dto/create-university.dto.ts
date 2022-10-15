import { IsNotEmpty, IsString, IsArray, Length } from 'class-validator';

export class CreateUniversityDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 2)
  alphaTwoCode: string;

  @IsNotEmpty()
  @IsArray()
  webPages: Array<string>;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsArray()
  domains: Array<string>;

  stateProvince: string;
}
