import { useEffect, useState } from 'react';
import { getBooks, deleteBook } from '../services/api';

export default function BookList() {
  const [books, setBooks] = useState<any[]>([]);

  const loadBooks = () => {
    getBooks()
      .then(setBooks)
      .catch(err => console.error("Помилка завантаження Ledger:", err));
  };

  useEffect(() => {
    loadBooks();
  }, []);

  // Логіка видалення з фразою "Just when I thought I was out, they pull me back in!" З серіалу "The Sopranos".
  const handleDelete = (id: number) => {
    const quote = "Just when I thought I was out, they pull me back in! \n\nВи впевнені, що хочете прибрати цю справу з обліку?";
    
    if (window.confirm(quote)) {
      deleteBook(id)
        .then(() => {
          loadBooks(); 
        })
        .catch(err => {
          console.error(err);
          alert("Не вдалося прибрати запис. Можливо, хтось " + '"зверху"' + " проти.");
        });
    }
  };

  return (
    <div>
      <h2 style={{ 
        fontSize: '1.8rem', 
        borderBottom: '1px solid #333', 
        paddingBottom: '15px', 
        marginBottom: '20px' 
      }}>
        Поточний Облік Справ
      </h2>
      
      <div className="book-list">
        {books.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
            <p>В обліку поки порожньо...</p>
            <p style={{ fontSize: '0.8rem', fontStyle: 'italic' }}>— All due respect, you got no f***in' idea what it's like to be Number One —</p>
          </div>
        ) : (
          books.map(book => (
            <div key={book.id} className="book-row">
              <div className="book-details">
                <span className="book-title">{book.title}</span>
                <span className="book-meta">
                  Associate ID: <span style={{ color: 'var(--primary-gold)' }}>{book.authorId}</span> | Territory: {book.genre}
                </span>
              </div>
              <button 
                onClick={() => handleDelete(book.id)}
                className="delete-action-btn"
              >
                Прибрати
              </button>
            </div>
          ))
        )}
      </div>

      <div style={{ 
        marginTop: '30px', 
        textAlign: 'right', 
        fontSize: '0.7rem', 
        color: '#444',
        textTransform: 'uppercase',
        letterSpacing: '1px'
      }}>
        Strictly Confidential — Bada Bing Inc.
      </div>
    </div>
  );
}