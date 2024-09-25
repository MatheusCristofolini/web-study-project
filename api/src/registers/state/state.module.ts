import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryModule } from '../country/country.module';
import { StateEntity } from './entities/state.entity';
import { StateController } from './state.controller';
import { StateService } from './state.service';

@Module({
  imports: [TypeOrmModule.forFeature([StateEntity]), CountryModule],
  controllers: [StateController],
  providers: [StateService],
  exports: [StateService],
})
export class StateModule {}
