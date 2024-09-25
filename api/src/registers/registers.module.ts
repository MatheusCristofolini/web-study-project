import { Module } from '@nestjs/common';
import { CityModule } from './city/city.module';
import { CountryModule } from './country/country.module';
import { StateModule } from './state/state.module';

@Module({
  imports: [CountryModule, StateModule, CityModule],
})
export class RegistersModule {}
