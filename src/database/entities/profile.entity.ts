import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProfileEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  age: number;

  @Column()
  phone: string;

  @Column()
  isOnline: string;
}
