import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StateService } from '../state/state.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { CountryEntity } from './entities/country.entity';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(CountryEntity)
    private readonly countryRepository: Repository<CountryEntity>,
    private readonly stateService: StateService,
  ) {}

  async create(createCountryDto: CreateCountryDto) {
    const hasCountry = await this.countryRepository.findOne({
      where: { name: createCountryDto.name },
    });

    if (hasCountry) {
      throw new InternalServerErrorException(
        `Já existe um país com o nome ${createCountryDto.name}!`,
      );
    }

    const country = this.countryRepository.create(createCountryDto);
    return this.countryRepository.save(country);
  }

  findAll() {
    return this.countryRepository.find();
  }

  async findOne(id: number) {
    const country = await this.countryRepository.findOne({
      where: { id: +id },
    });
    if (!country) {
      throw new NotFoundException(`País ${id} não cadastrado!`);
    }

    return country;
  }

  async update(id: number, updateCountryDto: UpdateCountryDto) {
    const country = await this.countryRepository.preload({
      id: +id,
      ...updateCountryDto,
    });
    if (!country) {
      throw new NotFoundException(`País ${id} não cadastrado!`);
    }

    const hasCountry = await this.countryRepository.findOne({
      where: { name: updateCountryDto.name },
    });

    if (hasCountry) {
      throw new InternalServerErrorException(
        `Já existe um país com o nome ${updateCountryDto.name}!`,
      );
    }

    return this.countryRepository.save(country);
  }

  async remove(id: number) {
    //const hasState = await this.stateService.findOne(id)
    const country = await this.findOne(id);
    return this.countryRepository.remove(country);
  }
}
