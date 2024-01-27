import { Question } from 'src/entities/question.entity';
import { User } from 'src/entities/user.entity';

export class CreateAnswerDto {
  readonly description: string;
  readonly questionId: number;
  question: Question;
  readonly user: User;
}
