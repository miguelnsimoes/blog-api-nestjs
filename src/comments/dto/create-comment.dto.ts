import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty({
    message: 'O comentário é obrigatório.',
  })
  @MinLength(3, {
    message: 'O comentário deve possuir no mínimo 3 caracteres.',
  })
  content: string;

  @IsNotEmpty({
    message: 'O autor é obrigatório.',
  })
  authorId: number;

  @IsNotEmpty({
    message: 'O post é obrigatório.',
  })
  postId: number;
}