import { Module } from '@nestjs/common';
import { UniversitiesService } from './universities.service';
import { UniversitiesController } from './universities.controller';
import { HttpModule} from '@nestjs/axios'
import { MongooseModule } from '@nestjs/mongoose';
import { UniversitySchema } from './interfaces/university.schema';




@Module({
  imports:[MongooseModule.forFeature([{ name: 'University', schema: UniversitySchema }]),
    HttpModule],
  controllers: [UniversitiesController],
  providers: [UniversitiesService],
  exports:[UniversitiesService]
})
export class UniversitiesModule {}
