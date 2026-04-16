import { useEffect, useState } from 'react';
import { getBooks, deleteBook } from '../services/api';
import { Card, CardContent, Typography, Button, CircularProgress, Box, Alert } from '@mui/material';
import { Link } from 'react-router-dom';

export default function BookList() {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadBooks = () => {
    setLoading(true);
    getBooks()
      .then(data => { setBooks(data); setLoading(false); })
      .catch(() => { setError('Не вдалося завантажити Ledger'); setLoading(false); });
  };

  useEffect(() => { loadBooks(); }, []);

  const handleDelete = (id: number) => {
    if (window.confirm("Just when I thought I was out, they pull me back in! Видалити?")) {
      deleteBook(id).then(loadBooks).catch(() => alert('Помилка видалення'));
    }
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress color="primary" /></Box>;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box>
      <Typography variant="h4" gutterBottom color="primary">Поточний Облік</Typography>
      
      {books.length === 0 ? (
        <Typography variant="body1" color="textSecondary">Облік чистий...</Typography>
      ) : (
        books.map(book => (
          <Card key={book.id} sx={{ mb: 2, borderLeft: '4px solid #590d22' }}>
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="h6">{book.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  ID Автора: {book.authorId} | Жанр: {book.genre}
                </Typography>
              </Box>
              <Box>
                <Button component={Link} to={`/edit/${book.id}`} color="primary" sx={{ mr: 1 }}>Редагувати</Button>
                <Button onClick={() => handleDelete(book.id)} color="error" variant="outlined">Прибрати</Button>
              </Box>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
}