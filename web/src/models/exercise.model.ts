import { QuestionModel } from './question.model';

export type ExerciseModel = {
  id?: number;
  name: string;
  description: string;
  questions: QuestionModel[];
  questionsLength?: number;
  createdAt?: Date;
};
