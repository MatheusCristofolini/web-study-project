import { CountryEntity } from 'src/registers/country/entities/country.entity';

export class CreateStateDto {
  readonly name: string;
  readonly country: CountryEntity;
}
