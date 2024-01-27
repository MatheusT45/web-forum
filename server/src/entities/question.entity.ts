import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Exercise } from './exercise.entity';
import { Answer } from './answer.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Exercise, (exercise) => exercise.questions, {
    onDelete: 'CASCADE',
  })
  exercise: Exercise;

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];
}
