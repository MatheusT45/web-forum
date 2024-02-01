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
import {
  answerExercise,
  getExercise,
  getExerciseAnswers,
} from '@/services/exercise.service';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import Snackbar from '@mui/material/Snackbar';
import { ExerciseDto } from '@/dtos/exercise.dto';
import { AnswerDto } from '@/dtos/answer.dto';
import { QuestionDto } from '@/dtos/question.dto';
import { useAtom } from 'jotai';
import { userAtom } from '@/store/user.store';

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
  const [exercise, setExercise] = useState<ExerciseDto>({} as ExerciseDto);
  const [answers, setAnswers] = useState<AnswerDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [previouslyAnswered, setPreviouslyAnswered] = useState(false);
  const [userId, setUserId] = useAtom(userAtom);

  const fetchExercise = async () => {
    if (!exerciseId || !userId) return;
    const exerciseResponse = await getExercise(+exerciseId);
    const answerResponse = await getExerciseAnswers(+exerciseId, userId);

    if (answerResponse.length > 0) {
      setOpenSnackbar(true);
      setPreviouslyAnswered(true);

      setExercise(exerciseResponse);
      setAnswers(answerResponse);

      return;
    }

    console.log(answerResponse);

    setExercise(exerciseResponse);
    setAnswers(exerciseResponse.questions.map(() => ({} as AnswerDto)));
  };

  useEffect(() => {
    fetchExercise();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    data.answers = Object.keys(data).map((key) => {
      if (!data[key]) return;

      data[key].user = userId || 0;
      return data[key];
    });

    await answerExercise(
      +exerciseId,
      data.answers.filter((answer: AnswerDto) => answer)
    );

    setIsLoading(false);
    push('/');
  });

  const handleClickCancel = () => {
    push('/');
  };

  const handleCloseSnackbar = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
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
              {exercise.questions?.map((question: QuestionDto, i: number) => {
                return (
                  <div key={question.id}>
                    <Typography component="h3">
                      {i + 1 + '. '}
                      {question.description}
                    </Typography>
                    <Controller
                      name={`answer-${question.id}`}
                      control={control}
                      render={() => (
                        <TextField
                          id={`answer-input-${question.id}`}
                          label="Sua Resposta"
                          variant="filled"
                          fullWidth
                          value={answers[i].description || ''}
                          InputProps={{
                            readOnly: previouslyAnswered,
                          }}
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            setAnswers(
                              answers.map((answer, index: number) => {
                                if (index === i) {
                                  return {
                                    ...answer,
                                    description: event.target.value,
                                    questionId: question.id,
                                  };
                                }
                                return answer;
                              })
                            );
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
            <Button
              variant="contained"
              type="submit"
              disabled={previouslyAnswered}
            >
              Responder
            </Button>
            <Button onClick={handleClickCancel}>Cancelar</Button>
          </CardActions>
        </form>
      </Card>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Questionário já respondido!"
      />
    </Box>
  );
}
