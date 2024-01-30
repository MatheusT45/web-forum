import ExerciseListComponent from '@/components/exercise-list';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <ExerciseListComponent />
    </main>
  );
}
