import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { createBook } from '../services/api';
import { useNavigate } from 'react-router-dom';

const schema = z.object({
  title: z.string().min(3, "Назва занадто коротка"),
  authorId: z.number().min(1, "ID автора обов'язкове"),
  genre: z.string().min(2, "Вкажіть жанр"),
});

export default function AddBook() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data: any) => {
    try {
      await createBook(data);
      navigate('/');
    } catch (e) {
      alert("Помилка при створенні!");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Додати нову книгу</h1>
      <div>
        <input {...register("title")} placeholder="Назва книги" />
        {errors.title?.message && <p style={{color: 'red'}}>{String(errors.title.message)}</p>}
      </div>
      <div>
        <input type="number" {...register("authorId", { valueAsNumber: true })} placeholder="ID автора" />
      </div>
      <div>
        <input {...register("genre")} placeholder="Жанр" />
      </div>
      <button type="submit">Зберегти</button>
    </form>
  );
}