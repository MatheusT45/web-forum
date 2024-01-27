import { User } from 'src/entities/user.entity';

export class CreateAnswerDto {
  readonly description: string;
  readonly questionId: number;
  readonly user: User;
}
