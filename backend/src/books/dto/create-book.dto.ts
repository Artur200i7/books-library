import { IsString, IsInt, MinLength, IsNotEmpty } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Назва має бути не менше 3 символів' })
  title!: string; // Додай знак оклику тут

  @IsInt()
  authorId!: number; // І тут

  @IsString()
  genre!: string; // І тут
}