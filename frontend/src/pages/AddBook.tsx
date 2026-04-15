import { useForm } from 'react-hook-form';
import { createBook } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function AddBook() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    const payload = {
      ...data,
      authorId: Number(data.authorId)
    };

    createBook(payload)
      .then(() => {
        alert("Нову справу внесено в Ledger!");
        navigate('/'); 
      })
      .catch((err) => {
        console.error(err);
        alert("Помилка! Перевір, чи ввів ти число в ID Автора.");
      });
  };

  return (
    <div>
      <h2 style={{ fontSize: '1.8rem', borderBottom: '1px solid #333', paddingBottom: '15px' }}>
        Внести нову книгу в Облік
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: '30px' }}>
        <input {...register('title')} placeholder="Назва книги (The Title)" required />
        <input {...register('authorId')} placeholder="ID Автора (The Associate ID)" type="number" required />
        <input {...register('genre')} placeholder="Жанр (The Territory)" required />
        <button type="submit" className="primary-btn">
          Внести в Ledger
        </button>
      </form>
    </div>
  );
}