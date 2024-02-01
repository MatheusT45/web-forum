'use client';

import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
} from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {
  deleteExerciseRequest,
  getExercises,
} from '@/services/exercise.service';
import { useRouter } from 'next/navigation';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCommentIcon from '@mui/icons-material/AddComment';
import { ExerciseDto } from '@/dtos/exercise.dto';
import { ExerciseModel } from '@/models/exercise.model';

export default function ExerciseListComponent() {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 1, minWidth: 40, maxWidth: 40 },
    {
      field: 'name',
      headerName: 'Nome',
      flex: 1,
      minWidth: 200,
      maxWidth: 200,
    },
    { field: 'description', headerName: 'Descrição', flex: 1, minWidth: 400 },
    {
      field: 'questionsLength',
      headerName: 'Qtd. Questões',
      type: 'number',
      flex: 1,
      minWidth: 120,
      maxWidth: 120,
    },
    {
      field: 'createdAt',
      headerName: 'Criado em',
      type: 'dateTime',
      flex: 1,
      minWidth: 200,
      maxWidth: 200,
    },
    {
      field: 'actions',
      type: 'actions',
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<AddCommentIcon />}
          label="Answer"
          onClick={answerExercise(params.id)}
          key={params.id}
        />,
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={editExercise(params.id)}
          key={params.id}
          showInMenu
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={deleteExercise(params.id)}
          key={params.id}
          showInMenu
        />,
      ],
    },
  ];

  const answerExercise = (id: GridRowId) => () => {
    push(`/answer-exercise/${id}`);
  };

  const editExercise = (id: GridRowId) => () => {
    push(`/edit-exercise/${id}`);
  };

  const deleteExercise = (id: GridRowId) => async () => {
    await deleteExerciseRequest(id.toString());
    await getPaginatedExercises();
  };

  const { push } = useRouter();
  const [exercises, setExercises] = useState<ExerciseModel[]>([]);

  const getPaginatedExercises = async () => {
    const paginatedExercises = await getExercises();

    const fixedExercises: ExerciseModel[] = [];
    paginatedExercises.forEach((exercise: ExerciseDto, i: number) => {
      fixedExercises[i] = {
        ...exercise,
        questionsLength: exercise.questions.length,
        createdAt: new Date(exercise.createdAt),
      };
    });
    setExercises(fixedExercises);
  };

  useEffect(() => {
    getPaginatedExercises();
  }, []);

  function handleCreateExerciseRedirect() {
    push('/create-exercise');
  }

  return (
    <Box sx={{ flexGrow: 1, margin: '3rem', width: '100%' }}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '20px',
            }}
          >
            <Typography variant="h5" component="div" color="text.secondary">
              Questionários
            </Typography>

            <Button variant="contained" onClick={handleCreateExerciseRedirect}>
              Novo
            </Button>
          </div>
          <DataGrid
            rows={exercises}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
        </CardContent>
      </Card>
    </Box>
  );
}
