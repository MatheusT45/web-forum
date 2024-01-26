import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Exercise } from '../exercise/exercise.entity';
import { Answer } from '../answer/answer.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column()
  password: string;

  @Column()
  cpf: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Exercise, (exercise) => exercise.createdBy)
  exercises: Exercise[];

  @OneToMany(() => Answer, (answer) => answer.user)
  answers: Answer[];
}
