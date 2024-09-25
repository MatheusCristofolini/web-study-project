import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CountryService } from '../country/country.service';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { StateEntity } from './entities/state.entity';

@Injectable()
export class StateService {
  constructor(
    @InjectRepository(StateEntity)
    private stateRepository: Repository<StateEntity>,
    private readonly countryService: CountryService,
  ) {}

  async create(createStateDto: CreateStateDto) {
    const hasCountry = await this.countryService.findOne(
      +createStateDto.country,
    );

    const hasState = await this.stateRepository.findOne({
      where: { name: createStateDto.name },
    });

    if (hasState) {
      throw new InternalServerErrorException(
        `Já existe um estado com o nome ${createStateDto.name}!`,
      );
    }

    const state = this.stateRepository.create(createStateDto);
    return this.stateRepository.save(state);
  }

  findAll() {
    return this.stateRepository.find();
  }

  async findOne(id: number) {
    const state = await this.stateRepository.findOne({ where: { id: +id } });
    if (!state) {
      throw new NotFoundException(`Estado ${id} não cadastrado!`);
    }

    return state;
  }

  async update(id: number, updateStateDto: UpdateStateDto) {
    const state = await this.stateRepository.preload({
      id: +id,
      ...updateStateDto,
    });
    return this.stateRepository.save(state);
  }

  async remove(id: number) {
    const state = await this.findOne(id);
    return this.stateRepository.remove(state);
  }
}
