import { StateEntity } from 'src/registers/state/entities/state.entity';

export class CreateCityDto {
  readonly name: string;
  readonly state: StateEntity;
}
