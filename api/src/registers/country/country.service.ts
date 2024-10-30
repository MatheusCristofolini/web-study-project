import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StateEntity } from '../state/entities/state.entity';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { CountryEntity } from './entities/country.entity';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(CountryEntity)
    private readonly countryRepository: Repository<CountryEntity>,
    @InjectRepository(StateEntity)
    private readonly stateRepository: Repository<StateEntity>,
  ) {}

  // PUBLIC
  public async create(createCountryDto: CreateCountryDto) {
    await this.validateUniqueCountryName(createCountryDto.name);
    const country = this.countryRepository.create(createCountryDto);
    return this.countryRepository.save(country);
  }
  public findAll() {
    return this.countryRepository.find();
  }
  public async findOne(id: number) {
    await this.countryNotFound(id);
    const country = await this.countryRepository.findOne({
      where: { id: +id },
    });
    return country;
  }
  public async update(id: number, updateCountryDto: UpdateCountryDto) {
    await this.countryNotFound(id);
    await this.validateUniqueCountryName(updateCountryDto.name, id);
    const country = await this.countryRepository.preload({
      id: +id,
      ...updateCountryDto,
    });
    return this.countryRepository.save(country);
  }
  public async remove(id: number) {
    const country = await this.findOne(id);
    await this.hasLinkedStates(country);
    return this.countryRepository.remove(country);
  }

  // PRIVATE
  private async validateUniqueCountryName(name: string, id?: number) {
    const hasCountry = await this.countryRepository.findOne({
      where: { name: name },
    });

    if (hasCountry && (!id || hasCountry.id !== id)) {
      throw new InternalServerErrorException(
        `Já existe um país com o nome ${name}!`,
      );
    }
  }
  private async countryNotFound(id: number) {
    const hasCountry = await this.countryRepository.findOne({
      where: { id: +id },
    });

    if (!hasCountry) {
      throw new NotFoundException(`País ${id} não cadastrado!`);
    }
  }
  private async hasLinkedStates(country: CreateCountryDto) {
    const hasState = await this.stateRepository.findOne({
      where: { country: country },
    });

    if (hasState) {
      throw new InternalServerErrorException(
        `Existem estados relacionados a esse país. Sua eliminação não é permitida!`,
      );
    }
  }
}
