import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { ExerciseProvider } from './exercise.provider';
import { ExerciseService } from './exercise.service';

@Module({
  imports: [DatabaseModule],
  providers: [...ExerciseProvider, ExerciseService],
})
export class ExerciseModule {}
