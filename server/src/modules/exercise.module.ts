import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ExerciseProvider } from '../providers/exercise.provider';
import { ExerciseService } from '../services/exercise.service';

@Module({
  imports: [DatabaseModule],
  providers: [...ExerciseProvider, ExerciseService],
})
export class ExerciseModule {}
