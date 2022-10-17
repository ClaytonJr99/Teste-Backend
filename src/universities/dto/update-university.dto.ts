import { PartialType } from '@nestjs/mapped-types';
import { CreateUniversityDto } from './create-university.dto';
import { IsString, IsArray, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUniversityDto extends PartialType(CreateUniversityDto) {
  @IsArray()
  @IsOptional()
  @ApiProperty({
    description: 'Lista com as URLs da universidade',
    example: '["http://www.arquitecturaucv.cl/"]',
  })
  webPages: Array<string>;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Nome da universidade por extenso',
    example: 'Universidad Austral de Chile',
  })
  name: string;

  @IsArray()
  @IsOptional()
  @ApiProperty({
    description: 'Lista de domínios da universidade',
    example: '["uahurtado.cl"]',
  })
  domains: Array<string>;
}
