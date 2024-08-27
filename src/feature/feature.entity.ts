import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CarFeature } from 'src/car-feature/car-feature.entity';

@Entity('features')
export class Feature {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  feature_name: string;

  @Column()
  category: string; // interior | Safety | Exterior | Comfort & Convenience

  @OneToMany(() => CarFeature, (carFeature) => carFeature.feature)
  carFeatures: CarFeature[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
