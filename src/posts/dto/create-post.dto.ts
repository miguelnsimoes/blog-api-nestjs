import { IsNotEmpty, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty({
    message: 'O título é obrigatório.',
  })
  title: string;

  @MinLength(50, {
    message: 'O conteúdo deve possuir no mínimo 50 caracteres.',
  })
  content: string;

  @IsNotEmpty({
    message: 'O slug é obrigatório.',
  })
  slug: string;
}