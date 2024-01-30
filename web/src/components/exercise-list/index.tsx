'use client';

import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { getExercises } from '@/services/exercise.service';
import { useRouter } from 'next/navigation';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', flex: 1, minWidth: 20 },
  { field: 'name', headerName: 'Nome', flex: 1, minWidth: 100 },
  { field: 'description', headerName: 'Descrição', flex: 1, minWidth: 400 },
  {
    field: 'questionsLength',
    headerName: 'Qtd. Questões',
    type: 'number',
    flex: 1,
    minWidth: 20,
  },
  {
    field: 'createdAt',
    headerName: 'Criado em',
    type: 'dateTime',
    flex: 1,
    minWidth: 200,
  },
];

export default function ExerciseListComponent() {
  const { push } = useRouter();
  const [exercises, setExercises] = useState([]);

  const getPaginatedExercises = async () => {
    const paginatedExercises = await getExercises();
    paginatedExercises.map((exercise: any) => {
      // TODO: REMOVE ANY
      exercise.questionsLength = exercise.questions.length;
      exercise.createdAt = new Date(exercise.createdAt);
      return exercise;
    });
    setExercises(paginatedExercises);
  };
  useEffect(() => {
    getPaginatedExercises();
  }, []);

  function handleCreateExerciseRedirect() {
    console.log('exercises', exercises);
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
              Exercise List
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
