import { IsString, IsNumber, MinLength } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @MinLength(2)
  title: string;

  @IsNumber()
  authorId: number;

  @IsString()
  genre: string;
}