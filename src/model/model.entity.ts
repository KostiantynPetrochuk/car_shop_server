import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Brand } from '../brand/brand.entity';

@Entity()
export class Model {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  model_name: string;

  @ManyToOne(() => Brand, (brand) => brand.models)
  brand: Brand;
}
