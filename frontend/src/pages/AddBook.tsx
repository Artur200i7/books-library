import { useForm } from 'react-hook-form';
import { createBook } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';

export default function AddBook() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    createBook({ ...data, authorId: Number(data.authorId) })
      .then(() => {
        reset();
        navigate('/');
      })
      .catch(() => alert("Помилка при внесенні в Ledger"));
  };

  const redFieldStyle = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': { 
        borderColor: '#590d22', 
        borderWidth: '1px'
      },
      '&:hover fieldset': { 
        borderColor: '#c9a55c' 
      },
      '&.Mui-focused fieldset': { 
        borderColor: '#c9a55c' 
      },
    },
    '& .MuiInputLabel-root': { color: '#888' }, 
    '& .MuiInputLabel-root.Mui-focused': { color: '#c9a55c' }, 
  };

  return (
    <Box sx={{ background: '#111', p: 4, border: '1px solid #1a1a1a', boxShadow: '0 20px 50px rgba(0,0,0,0.9)' }}>
      <Typography variant="h4" sx={{ 
        textAlign: 'center', 
        color: '#c9a55c', 
        mb: 4, 
        fontFamily: '"Playfair Display", serif', 
        fontWeight: 700 
      }}>
        Внести Нову Справу
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField 
          label="Назва справи" 
          variant="outlined" 
          {...register('title')} 
          fullWidth required 
          sx={redFieldStyle}
        />
        <TextField 
          label="ID Асоціата" 
          variant="outlined" 
          type="number" 
          {...register('authorId')} 
          fullWidth required 
          sx={redFieldStyle}
        />
        <TextField 
          label="Територія (Жанр)" 
          variant="outlined" 
          {...register('genre')} 
          fullWidth required 
          sx={redFieldStyle}
        />

        <Button 
          type="submit" 
          variant="contained" 
          sx={{ 
            mt: 2, 
            py: 1.8, 
            backgroundColor: '#c9a55c', 
            color: '#000', 
            fontWeight: '900', 
            borderRadius: 0, 
            letterSpacing: '2px',
            '&:hover': { backgroundColor: '#a88a4d' } 
          }}
        >
          ВНЕСТИ В LEDGER
        </Button>
      </Box>
    </Box>
  );
}