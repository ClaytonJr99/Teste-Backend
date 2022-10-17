import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UniversitiesModule } from './universities/universities.module';
import { ConfigModule } from '@nestjs/config';

console.log(process.env.DB_URL);

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URL),
    UniversitiesModule,
  ],
})
export class AppModule {}
