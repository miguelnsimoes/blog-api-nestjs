import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({
    message: 'O nome é obrigatório.',
  })
  name: string;

  @IsEmail(
    {},
    {
      message: 'Informe um e-mail válido.',
    },
  )
  email: string;

  @MinLength(6, {
    message: 'A senha deve possuir no mínimo 6 caracteres.',
  })
  password: string;
}