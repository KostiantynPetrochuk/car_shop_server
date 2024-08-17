import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Model } from '../model/model.entity';

@Entity()
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  brand_name: string;

  @Column()
  file_name: string;

  @OneToMany(() => Model, (model) => model.brand)
  models: Model[];
}
