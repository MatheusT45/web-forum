import { AnswerDto } from '@/dtos/answer.dto';
import { ExerciseDto } from '@/dtos/exercise.dto';
import { ExerciseModel } from '@/models/exercise.model';

type CreateExerciseDto = {
  name: string;
  description: string;
  questions: { description: string }[];
};

export const getExercises = async (): Promise<ExerciseDto[]> => {
  const response = await fetch('http://localhost:3000/questionarios');
  const exercises = await response.json();

  return exercises.data;
};

export const getExercise = async (id: number): Promise<ExerciseDto> => {
  const response = await fetch(`http://localhost:3000/questionario/${id}`);
  const exercises = await response.json();

  return exercises;
};

export const createExercise = async (
  exercise: Partial<ExerciseDto>
): Promise<ExerciseDto> => {
  const response = await fetch('http://localhost:3000/questionario', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(exercise),
  });

  return await response.json();
};

export const updateExercise = async (
  id: string,
  exerciseDto: ExerciseDto
): Promise<ExerciseDto> => {
  const response = await fetch(`http://localhost:3000/questionario/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(exerciseDto),
  });

  const updatedExercise = await response.json();

  return updatedExercise;
};

export const deleteExerciseRequest = async (
  id: string
): Promise<{ success: boolean }> => {
  const response = await fetch(`http://localhost:3000/questionario/${id}`, {
    method: 'DELETE',
  });

  const deletedExercise = await response.json();

  return deletedExercise;
};

export const answerExercise = async (
  exerciseId: number,
  answers: AnswerDto
): Promise<AnswerDto> => {
  const response = await fetch(
    `http://localhost:3000/questionario/${exerciseId}/resposta`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(answers),
    }
  );

  const createdAnswers = await response.json();

  return createdAnswers;
};

export const getExerciseAnswers = async (
  exerciseId: number,
  userId: number
): Promise<AnswerDto[]> => {
  const response = await fetch(
    `http://localhost:3000/questionario/${exerciseId}/respostas?filter.user=${userId}`
  );

  const exercises = await response.json();

  return exercises.data;
};
