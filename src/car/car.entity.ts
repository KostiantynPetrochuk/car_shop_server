import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Brand } from '../brand/brand.entity';
import { Model } from '../model/model.entity';

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  vin: string;

  @ManyToOne(() => Brand, { nullable: false })
  brand: Brand;

  @ManyToOne(() => Model, { nullable: false })
  model: Model;

  @Column()
  body: string;

  @Column()
  mileage: number;

  @Column()
  fuel_type: string;

  @Column()
  year: number;

  @Column()
  transmission: string;

  @Column()
  drive_type: string;

  @Column()
  condition: string;

  @Column('decimal', { precision: 3, scale: 1 })
  engine_size: number;

  @Column()
  door_count: number;

  @Column()
  cylinder_count: number;

  @Column()
  color: string;
}
