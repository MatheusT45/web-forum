import { QuestionProvider } from './question.provider';
import { AnswerProvider } from './answer.provider';
import { ExerciseProvider } from './exercise.provider';
import { UserProvider } from './user.provider';

export const Providers = [
  ...QuestionProvider,
  ...AnswerProvider,
  ...ExerciseProvider,
  ...UserProvider,
];
