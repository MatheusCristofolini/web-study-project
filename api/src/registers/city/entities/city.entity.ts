import { StateEntity } from 'src/registers/state/entities/state.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne((type) => StateEntity, (state) => state.city)
  state: StateEntity;
}
