import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CityEntity } from '../city/entities/city.entity';
import { CountryEntity } from '../country/entities/country.entity';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { StateEntity } from './entities/state.entity';

@Injectable()
export class StateService {
  constructor(
    @InjectRepository(StateEntity)
    private readonly stateRepository: Repository<StateEntity>,
    @InjectRepository(CountryEntity)
    private readonly countryRepository: Repository<CountryEntity>,
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
  ) {}

  // PUBLIC
  public async create(createStateDto: CreateStateDto) {
    await this.countryNotFound(createStateDto.country.id);
    await this.validateUniqueStateName(createStateDto.name);
    const state = this.stateRepository.create(createStateDto);
    return this.stateRepository.save(state);
  }
  public findAll() {
    return this.stateRepository.find();
  }
  public async findOne(id: number) {
    await this.stateNotFound(id);
    const state = await this.stateRepository.findOne({ where: { id: +id } });
    return state;
  }
  public async update(id: number, updateStateDto: UpdateStateDto) {
    await this.countryNotFound(updateStateDto.country.id);
    await this.validateUniqueStateName(updateStateDto.name);
    const state = await this.stateRepository.preload({
      id: +id,
      ...updateStateDto,
    });
    return this.stateRepository.save(state);
  }
  public async remove(id: number) {
    await this.hasLinkedCity(id);
    const state = await this.findOne(id);
    return this.stateRepository.remove(state);
  }

  // PRIVATE
  private async validateUniqueStateName(name: string, id?: number) {
    const hasState = await this.stateRepository.findOne({
      where: { name: name },
    });

    if (hasState && (!id || hasState.id !== id)) {
      throw new InternalServerErrorException(
        `Já existe um estado com o nome ${name}!`,
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
  private async stateNotFound(id: number) {
    const hasState = await this.stateRepository.findOne({
      where: { id: id },
    });

    if (!hasState) {
      throw new NotFoundException(`Estado ${id} não cadastrado!`);
    }
  }
  private async hasLinkedCity(id: number) {
    const state = await this.countryRepository.findOne({
      where: { id: +id },
    });
    const hasCity = await this.cityRepository.findOne({
      where: { state: state.state },
    });

    if (hasCity) {
      throw new InternalServerErrorException(
        `Existem cidades relacionados a esse estado. Sua eliminação não é permitida!`,
      );
    }
  }
}
