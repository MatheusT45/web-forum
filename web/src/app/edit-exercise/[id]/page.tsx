import ExerciseFormComponent from '@/components/exercise-form';

export default function EditExercisePage({
  params,
}: {
  params: { id: string };
}) {
  // return <div>My Post: {params.id}</div>;
  return (
    <main>
      <ExerciseFormComponent exerciseId={params.id} />
    </main>
  );
}
