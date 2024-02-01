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
import { FormEvent, useEffect, useState } from 'react';
import {
  createExercise,
  getExercise,
  updateExercise,
} from '@/services/exercise.service';
import { useRouter } from 'next/navigation';

export default function ExerciseFormComponent({
  exerciseId,
}: {
  exerciseId?: string;
}) {
  const { push } = useRouter();
  const [exercise, setExercise] = useState({
    questions: [
      {
        description: '',
      },
    ],
  } as any); // TODO: ADD TYPE TO EXERCISE
  const [questionCount, setQuestionCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchExercise = async () => {
    if (!exerciseId) return;
    const response = await getExercise(+exerciseId);
    setExercise(response);
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

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const questionDescriptions = formData.getAll('question.description');

      formData.delete('question.description');
      formData.append(
        'questions',
        JSON.stringify(
          questionDescriptions.map((description) => ({ description }))
        )
      );
      formData.append('createdBy', '1'); // TODO: ADD CPF AS A PARAMETER

      if (exerciseId) {
        await updateExercise(exerciseId, formData);
        return;
      }
      await createExercise(formData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      push('/');
    }
  }

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
                name="name"
                value={exercise.name || ''}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setExercise({ ...exercise, name: event.target.value });
                }}
              />

              <TextField
                id="exercise-description-input"
                label="Descrição"
                name="description"
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
                    name="question.description"
                    value={exercise.questions?.[i]?.description || ''}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setExercise({
                        ...exercise,
                        questions: exercise.questions.map(
                          (
                            question: { description: string },
                            index: number
                          ) => {
                            if (index === i) {
                              return {
                                ...question,
                                description: event.target.value,
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
