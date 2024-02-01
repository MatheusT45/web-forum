import { User } from 'src/entities/user.entity';

export class AnswerDto {
  readonly description: string;
  readonly questionId: number;
  readonly user: User;
}
