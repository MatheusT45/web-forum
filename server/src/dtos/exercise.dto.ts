import { Question } from '../entities/question.entity';
import { User } from '../entities/user.entity';

export class ExerciseDto {
  readonly name: string;
  readonly description: string;
  readonly createdBy: User;
  readonly questions: Question[];
}
