type CreateExerciseDto = {
  name: string;
  description: string;
  questions: { description: string }[];
};

export const getExercises = async () => {
  const response = await fetch('http://localhost:3000/questionarios');
  const exercises = await response.json();

  return exercises;
};

export const createExercise = async (exerciseFormData: FormData) => {
  const exercise: any = {};
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
