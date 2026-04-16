import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { getBookById, updateBook } from '../services/api';
import { TextField, Button, Box, Typography, Paper, CircularProgress } from '@mui/material';

export default function EditBook() {
  const { id } = useParams();
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    getBookById(Number(id)).then(book => {
      setValue('title', book.title);
      setValue('authorId', book.authorId);
      setValue('genre', book.genre);
    });
  }, [id, setValue]);

  const onSubmit = (data: any) => {
    updateBook(Number(id), { ...data, authorId: Number(data.authorId) })
      .then(() => navigate('/'))
      .catch(() => alert("Помилка оновлення."));
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom color="primary">Оновити Справу #{id}</Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField label="Назва книги" {...register('title')} required fullWidth focused />
        <TextField label="ID Автора" type="number" {...register('authorId')} required fullWidth focused />
        <TextField label="Жанр" {...register('genre')} required fullWidth focused />
        <Button type="submit" variant="contained" color="primary" size="large">Зберегти Зміни</Button>
      </Box>
    </Paper>
  );
}