import { IsNotEmpty, IsString, IsArray, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUniversityDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 2)
  @ApiProperty({
    description: 'Sigla do pais com 2 caracteres',
    example: 'CL',
  })
  alphaTwoCode: string;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty({
    description: 'Lista com as URLs da universidade',
    example: '["http://www.arquitecturaucv.cl/"]',
  })
  webPages: Array<string>;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Nome da universidade por extenso',
    example: 'Universidad Austral de Chile',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Nome do país por extenso',
    example: 'Chile',
  })
  country: string;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty({
    description: 'Lista de domínios da universidade',
    example: '["uahurtado.cl"]',
  })
  domains: Array<string>;

  @ApiProperty({
    description: 'Sigla do estado onde fica a universidade se houver',
    example: 'Buenos Aires',
  })
  stateProvince: string;
}
