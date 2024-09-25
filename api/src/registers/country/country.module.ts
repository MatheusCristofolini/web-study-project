import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StateModule } from '../state/state.module';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';
import { CountryEntity } from './entities/country.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CountryEntity]), StateModule],
  controllers: [CountryController],
  providers: [CountryService],
  exports: [CountryService],
})
export class CountryModule {}
