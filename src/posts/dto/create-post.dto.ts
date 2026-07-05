import { IsNotEmpty, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  title: string;

  @MinLength(50)
  content: string;

  @IsNotEmpty()
  slug: string;

  @IsNotEmpty()
  authorId: number;
}