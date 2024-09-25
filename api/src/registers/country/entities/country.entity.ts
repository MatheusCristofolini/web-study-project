import { StateEntity } from 'src/registers/state/entities/state.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CountryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany((type) => StateEntity, (state) => state.country)
  state: StateEntity[];
}
