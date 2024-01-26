import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Exercise } from '../exercise/exercise.entity';
import { Answer } from '../answer/answer.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  description: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Exercise, (exercise) => exercise.questions)
  exercise: Exercise;

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];
}
