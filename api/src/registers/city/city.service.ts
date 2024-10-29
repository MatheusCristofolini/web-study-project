import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StateEntity } from '../state/entities/state.entity';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { CityEntity } from './entities/city.entity';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
    @InjectRepository(StateEntity)
    private readonly stateRepository: Repository<StateEntity>,
  ) {}

  // PUBLIC
  public async create(createCityDto: CreateCityDto) {
    await this.stateNotFound(createCityDto.state.id);
    await this.validateUniqueCityName(createCityDto.name);
    const city = this.cityRepository.create(createCityDto);
    return this.cityRepository.save(city);
  }
  public findAll() {
    return this.cityRepository.find();
  }
  public async findOne(id: number) {
    await this.cityNotFound(id);
    const city = await this.cityRepository.findOne({ where: { id: +id } });
    return city;
  }
  public async update(id: number, updateCityDto: UpdateCityDto) {
    await this.stateNotFound(updateCityDto.state.id);
    await this.validateUniqueCityName(updateCityDto.name, id);
    const city = await this.cityRepository.preload({
      id: +id,
      ...updateCityDto,
    });
    return this.cityRepository.save(city);
  }
  public async remove(id: number) {
    const city = await this.findOne(id);
    return this.cityRepository.remove(city);
  }

  // PRIVATE
  private async validateUniqueCityName(name: string, id?: number) {
    const hasCity = await this.cityRepository.findOne({
      where: { name: name },
    });

    if (hasCity && (!id || hasCity.id !== id)) {
      throw new InternalServerErrorException(
        `Já existe uma cidade com o nome ${name}!`,
      );
    }
  }
  private async cityNotFound(id: number) {
    const hasCity = await this.cityRepository.findOne({ where: { id: +id } });
    if (!hasCity) {
      throw new NotFoundException(`Cidade ${id} não cadastrada!`);
    }
  }
  private async stateNotFound(id: number) {
    const hasState = await this.stateRepository.findOne({ where: { id: +id } });
    if (!hasState) {
      throw new NotFoundException(`Estado ${id} não cadastrado!`);
    }
  }
}
