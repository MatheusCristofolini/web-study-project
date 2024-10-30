import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityEntity } from '../city/entities/city.entity';
import { CountryEntity } from '../country/entities/country.entity';
import { StateEntity } from './entities/state.entity';
import { StateController } from './state.controller';
import { StateService } from './state.service';

@Module({
  imports: [TypeOrmModule.forFeature([StateEntity, CountryEntity, CityEntity])],
  controllers: [StateController],
  providers: [StateService],
})
export class StateModule {}
