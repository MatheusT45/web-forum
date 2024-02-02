import ExerciseFormComponent from '@/components/exercise-form';

export default function EditExercisePage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <main>
      <ExerciseFormComponent exerciseId={params.id} />
    </main>
  );
}
