import { QuestionDto } from './question.dto';

export type ExerciseDto = {
  id?: number;
  name: string;
  description: string;
  questions: QuestionDto[];
  createdAt: string;
};
