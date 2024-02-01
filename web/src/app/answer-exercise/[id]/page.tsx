import ExerciseAnswerFormComponent from '@/components/exercise-answer-form';

export default function AnswerExercisePage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <main>
      <ExerciseAnswerFormComponent exerciseId={params.id} />
    </main>
  );
}
