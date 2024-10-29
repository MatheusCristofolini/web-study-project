import { CityEntity } from 'src/registers/city/entities/city.entity';
import { CountryEntity } from 'src/registers/country/entities/country.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class StateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne((type) => CountryEntity, (country) => country.state)
  country: CountryEntity;

  @OneToMany((type) => CityEntity, (city) => city.state)
  city: CityEntity;
}
