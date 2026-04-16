import { useForm } from 'react-hook-form';
import { createBook } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';

export default function AddBook() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    createBook({ ...data, authorId: Number(data.authorId) })
      .then(() => navigate('/'))
      .catch(() => alert("Помилка! Перевір дані."));
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom color="primary">Внести Справу</Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField label="Назва книги" {...register('title')} required fullWidth variant="outlined" />
        <TextField label="ID Автора" type="number" {...register('authorId')} required fullWidth />
        <TextField label="Жанр" {...register('genre')} required fullWidth />
        <Button type="submit" variant="contained" color="secondary" size="large">Внести в Ledger</Button>
      </Box>
    </Paper>
  );
}