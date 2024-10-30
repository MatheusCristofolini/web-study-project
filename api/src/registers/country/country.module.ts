import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StateEntity } from '../state/entities/state.entity';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';
import { CountryEntity } from './entities/country.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CountryEntity, StateEntity])],
  controllers: [CountryController],
  providers: [CountryService],
})
export class CountryModule {}
