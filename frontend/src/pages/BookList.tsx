import { useEffect, useState } from 'react';
import { getBooks, deleteBook } from '../services/api';
import { Box, Typography, Button, CircularProgress, Divider, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Link } from 'react-router-dom';

export default function BookList() {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [open, setOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<{id: number, title: string} | null>(null);

  const loadData = () => {
    setLoading(true);
    getBooks().then(data => { setBooks(data); setLoading(false); }).catch(() => setLoading(false));
  };

  useEffect(() => { loadData(); }, []);

  const handleClickOpen = (book: any) => {
    setSelectedBook({ id: book.id, title: book.title });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBook(null);
  };

  const handleConfirmDelete = () => {
    if (selectedBook) {
      deleteBook(selectedBook.id)
        .then(() => {
          setBooks(prev => prev.filter(book => book.id !== selectedBook.id));
          handleClose();
        })
        .catch(() => {
          alert("Помилка при видаленні");
          handleClose();
        });
    }
  };

  if (loading) return <Box sx={{ textAlign: 'center', mt: 10 }}><CircularProgress color="primary" /></Box>;

  return (
    <Box sx={{ background: '#111', p: 4, borderRadius: '4px', boxShadow: '0 10px 30px rgba(0,0,0,0.8)' }}>
      <Typography variant="h5" sx={{ textAlign: 'center', fontFamily: '"Playfair Display", serif', color: '#c9a55c', mb: 3 }}>
        Поточний Облік Справ
      </Typography>
      
      <Divider sx={{ borderColor: '#222', mb: 3 }} />

      {books.map(book => (
        <Box key={book.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, pb: 2, borderBottom: '1px solid #1a1a1a' }}>
          <Box>
            <Typography sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#fff' }}>{book.title}</Typography>
            <Typography sx={{ fontSize: '0.75rem', color: '#666', textTransform: 'uppercase', letterSpacing: '1px' }}>
              ID: {book.id} | {book.genre}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button component={Link} to={`/edit/${book.id}`} sx={{ color: '#c9a55c', fontSize: '0.7rem' }}>Ред.</Button>
            <Button 
              onClick={() => handleClickOpen(book)} 
              variant="outlined" 
              sx={{ color: '#ff4444', borderColor: '#442222', fontSize: '0.7rem' }}
            >
              Прибрати
            </Button>
          </Box>
        </Box>
      ))}

      <Dialog
        open={open}
        onClose={handleClose}
        sx={{ '& .MuiDialog-paper': { backgroundColor: '#111', border: '2px solid #590d22', borderRadius: 0, p: 2 } }}
      >
        <DialogTitle sx={{ fontFamily: '"Playfair Display", serif', color: '#c9a55c', fontWeight: 900, textAlign: 'center' }}>
          УВАГА, ЗАПИС №{selectedBook?.id}
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center', py: 3 }}>
          <Typography variant="body1" sx={{ color: '#c9a55c', fontStyle: 'italic', mb: 1.5 }}>
            "Just when I thought I was out..."
          </Typography>
          <Typography variant="body2" sx={{ color: '#888' }}>
            Справу <strong>{selectedBook?.title}</strong> буде видалено. Ви підтверджуєте це?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', gap: 2 }}>
          <Button onClick={handleClose} sx={{ color: '#888' }}>СКАСУВАТИ</Button>
          <Button onClick={handleConfirmDelete} variant="contained" sx={{ backgroundColor: '#c9a55c', color: '#000', fontWeight: 'bold', borderRadius: 0 }}>
            ТАК, ПРИБРАТИ!
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}