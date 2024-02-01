'use client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import RemoveIcon from '@mui/icons-material/Remove';
import { useEffect, useState } from 'react';
import {
  createExercise,
  getExercise,
  updateExercise,
} from '@/services/exercise.service';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { ExerciseDto } from '@/dtos/exercise.dto';

export default function ExerciseFormComponent({
  exerciseId,
}: {
  exerciseId?: string;
}) {
  const { register, handleSubmit } = useForm();
  const { push } = useRouter();
  const [exercise, setExercise] = useState<ExerciseDto>({
    name: '',
    description: '',
    questions: [
      {
        description: '',
      },
    ],
    createdAt: new Date().toString(),
  });
  const [questionCount, setQuestionCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchExercise = async () => {
    if (!exerciseId) return;
    const response = await getExercise(+exerciseId);
    setExercise({ ...response, createdAt: response.createdAt });
    setQuestionCount(response.questions.length);
  };

  useEffect(() => {
    fetchExercise();
  }, []);

  const handleClickNewQuestion = () => {
    setExercise({
      ...exercise,
      questions: [
        ...exercise.questions,
        {
          description: '',
        },
      ],
    });
    setQuestionCount(questionCount + 1);
  };

  const handleClickRemoveQuestion = (i: number) => {
    setExercise({
      ...exercise,
      questions: exercise.questions.filter(
        (_: { description: string }, index: number) => index !== i
      ),
    });
    setQuestionCount(questionCount - 1);
  };

  const onSubmit = handleSubmit(async () => {
    setIsLoading(true);
    try {
      if (exerciseId) {
        // remove ids from questions to always create new ones
        exercise.questions.map((question) => {
          if (question.id) {
            delete question.id;
            return question;
          }
          return question;
        });
        await updateExercise(exerciseId, exercise);
        return;
      }
      await createExercise(exercise);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      push('/');
    }
  });

  const handleClickCancel = () => {
    push('/');
  };

  return (
    <Box sx={{ flexGrow: 1, margin: '3rem' }}>
      <Card sx={{ minWidth: 275 }}>
        <form onSubmit={onSubmit}>
          <CardContent>
            <Typography variant="h5" component="div" color="text.secondary">
              Novo Questionário
            </Typography>
            <Divider />
            <Container
              sx={{
                marginTop: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              <TextField
                required
                id="exercise-name-input"
                label="Nome"
                {...register('name')}
                value={exercise.name || ''}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setExercise({ ...exercise, name: event.target.value });
                }}
              />

              <TextField
                id="exercise-description-input"
                label="Descrição"
                {...register('description')}
                maxRows={4}
                value={exercise.description || ''}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setExercise({ ...exercise, description: event.target.value });
                }}
              />

              <Typography
                sx={{ fontSize: 14, display: 'flex', alignItems: 'center' }}
                color="text.secondary"
                gutterBottom
              >
                Questões{' '}
                <IconButton onClick={handleClickNewQuestion}>
                  <AddIcon sx={{ bgColor: 'primary.info' }} />
                </IconButton>
              </Typography>
              {[...Array(questionCount)].map((x, i) => (
                <FormControl sx={{ width: '100%' }} key={i}>
                  <InputLabel htmlFor="question-description-input">
                    Descrição
                  </InputLabel>
                  <OutlinedInput
                    id="question-description-input"
                    label="Descrição"
                    value={exercise.questions?.[i]?.description || ''}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setExercise({
                        ...exercise,
                        questions: exercise.questions.map(
                          (question, index: number) => {
                            if (index === i) {
                              return {
                                ...question,
                                description: event.target.value,
                                id: question.id || undefined,
                              };
                            }
                            return question;
                          }
                        ),
                      });
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="remove question"
                          onClick={() => handleClickRemoveQuestion(i)}
                          edge="end"
                        >
                          <RemoveIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              ))}
            </Container>
          </CardContent>
          <CardActions>
            <Button variant="contained" type="submit">
              Salvar
            </Button>
            <Button onClick={handleClickCancel}>Cancelar</Button>
          </CardActions>
        </form>
      </Card>
    </Box>
  );
}
