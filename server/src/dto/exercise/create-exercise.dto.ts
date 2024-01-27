import { Question } from 'src/entities/question.entity';
import { User } from 'src/entities/user.entity';

export class CreateExerciseDto {
  readonly name: string;
  readonly description: string;
  readonly createdBy: User;
  readonly questions: Question[];
}
