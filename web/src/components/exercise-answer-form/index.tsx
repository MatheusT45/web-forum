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
import { useEffect, useState } from 'react';
import { getExercise } from '@/services/exercise.service';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';

export default function ExerciseAnswerFormComponent({
  exerciseId,
}: {
  exerciseId: string;
}) {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { push } = useRouter();
  const [exercise, setExercise] = useState({} as any); // TODO: ADD TYPE TO EXERCISE
  const [isLoading, setIsLoading] = useState(false);

  const fetchExercise = async () => {
    if (!exerciseId) return;
    const response = await getExercise(+exerciseId);
    setExercise(response);
  };

  useEffect(() => {
    fetchExercise();
  }, []);

  const onSubmit = handleSubmit((data) => {
    setIsLoading(true);
    data.answers = Object.keys(data).map((key) => {
      if (!data[key]) return;

      data[key].user = 1; // TODO: ADD CPF AS A PARAMETER
      return data[key];
    });

    console.log(data.answers.filter((answer: any) => answer));
    // await answerExercise(exerciseId, formData);

    setIsLoading(false);
    // push('/');
  });

  // async function onSubmit(event: FormEvent<HTMLFormElement>) {
  //   event.preventDefault();
  //   setIsLoading(true);

  //   try {
  //     const formData = new FormData(event.currentTarget);

  //     formData.append('createdBy', '1'); // TODO: ADD CPF AS A PARAMETER

  //     formData.append('description', '1');

  //     console.log('formData', formData);
  //     console.log('answers', answers);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setIsLoading(false);
  //     // push('/');
  //   }
  // }

  const handleClickCancel = () => {
    push('/');
  };

  return (
    <Box sx={{ flexGrow: 1, margin: '3rem' }}>
      <Card sx={{ minWidth: 275 }}>
        <form onSubmit={onSubmit}>
          <CardContent>
            <Typography variant="h5" component="div" color="text.secondary">
              Responder Questionário
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
              <Typography component="h2">{exercise.description}</Typography>
              {exercise.questions?.map((question: any, i: number) => {
                return (
                  <div key={question.id}>
                    <Typography component="h3">
                      {question.description}
                    </Typography>
                    <Controller
                      name={`answer-${question.id}`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          id={`answer-input-${question.id}`}
                          label="Resposta"
                          variant="filled"
                          fullWidth
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            setValue(`answers-${question.id}`, {
                              description: event.target.value,
                              questionId: question.id,
                            });
                          }}
                        />
                      )}
                    />
                  </div>
                );
              })}
            </Container>
          </CardContent>
          <CardActions>
            <Button variant="contained" type="submit">
              Responder
            </Button>
            <Button onClick={handleClickCancel}>Cancelar</Button>
          </CardActions>
        </form>
      </Card>
    </Box>
  );
}
