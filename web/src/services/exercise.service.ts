type CreateExerciseDto = {
  name: string;
  description: string;
  questions: { description: string }[];
};

export const getExercises = async () => {
  const response = await fetch('http://localhost:3000/questionarios');
  const exercises = await response.json();

  return exercises.data;
};

export const getExercise = async (id: number) => {
  const response = await fetch(`http://localhost:3000/questionario/${id}`);
  const exercises = await response.json();

  return exercises;
};

export const createExercise = async (exerciseFormData: FormData) => {
  const exercise: any = {}; // TODO: REMOVE ANY
  exerciseFormData.forEach(function (value, key) {
    exercise[key] = value;
  });

  exercise.questions = JSON.parse(exercise.questions);

  const response = await fetch('http://localhost:3000/questionario', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(exercise),
  });

  const createdExercise = await response.json();

  return createdExercise;
};

// TODO: REMOVE ANY FROM ANSWERS
export const answerExercise = async (exerciseId: number, answers: any) => {
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

// TODO: REMOVE ANY FROM ANSWERS
export const getExerciseAnswer = async (exerciseId: number, userId: number) => {
  const response = await fetch(
    `http://localhost:3000/questionario/${exerciseId}/respostas?filter.user=${userId}`
  );

  const exercises = await response.json();

  return exercises.data;
};

export const updateExercise = async (
  id: string,
  exerciseFormData: FormData
) => {
  const exercise: any = {}; // TODO: REMOVE ANY
  exerciseFormData.forEach(function (value, key) {
    exercise[key] = value;
  });

  exercise.questions = JSON.parse(exercise.questions);

  const response = await fetch(`http://localhost:3000/questionario/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(exercise),
  });

  const updatedExercise = await response.json();

  return updatedExercise;
};

export const deleteExerciseRequest = async (id: string) => {
  const response = await fetch(`http://localhost:3000/questionario/${id}`, {
    method: 'DELETE',
  });

  const deletedExercise = await response.json();

  return deletedExercise;
};
