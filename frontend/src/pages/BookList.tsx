import { useEffect, useState } from 'react';
import { getBooks, deleteBook } from '../services/api';

export default function BookList() {
  const [books, setBooks] = useState<any[]>([]);

  const loadBooks = () => getBooks().then(setBooks);

  useEffect(() => { loadBooks(); }, []);

  const handleDelete = async (id: number) => {
    await deleteBook(id);
    loadBooks();
  };

  return (
    <div>
      <h1>Моя бібліотека</h1>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            <strong>{book.title}</strong> — {book.genre} 
            <button onClick={() => handleDelete(book.id)} style={{ marginLeft: '10px' }}>Видалити</button>
          </li>
        ))}
      </ul>
    </div>
  );
}