import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Car } from '../car/car.entity';
import { Feature } from '../feature/feature.entity';

@Entity('car_features')
export class CarFeature {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Car, (car) => car.carFeatures, { nullable: false })
  car: Car;

  @ManyToOne(() => Feature, (feature) => feature.carFeatures, {
    nullable: false,
  })
  feature: Feature;
}
