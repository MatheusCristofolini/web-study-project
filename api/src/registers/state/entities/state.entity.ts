import { CountryEntity } from 'src/registers/country/entities/country.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class StateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne((type) => CountryEntity, (country) => country.state)
  country: CountryEntity;
}
