import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from 'src/enums/role.enum';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  login: string;

  @Column()
  hashPwd: string;

  @Column()
  salt: string;

  @Column({ default: true })
  isActive: boolean;

  @Column('jsonb', { default: [Role.User] })
  roles: Role[];
}
