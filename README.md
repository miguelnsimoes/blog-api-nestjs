# Blog API NestJS

API RESTful para um blog desenvolvido com NestJS, TypeScript, PostgreSQL e TypeORM.

## Visão Geral

Este projeto implementa um backend de blog com módulos de usuários, autenticação JWT, posts e comentários. O objetivo é fornecer um serviço organizado em módulos, com validação de entrada, relacionamentos de banco de dados e autenticação por token.

## Tecnologias

- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- Passport + JWT
- bcrypt
- class-validator / class-transformer
- Docker Compose (para banco de dados)

## Funcionalidades implementadas

- Cadastro de usuários (`POST /users`)
- Login com JWT (`POST /auth/login`)
- CRUD de posts com paginação
- CRUD de comentários vinculados a posts e usuários
- Validação de DTOs
- Hash de senha com `bcrypt`
- Relações entre `User`, `Post` e `Comment`
- `CORS` habilitado
- `ValidationPipe` global configurado

## Requisitos do projeto

- Node.js 20+ (recomendado)
- npm
- Docker (recomendado)

## Configuração

1. Instale dependências:

```bash
npm install
```

2. Crie um arquivo `.env` na raiz do projeto com estas variáveis:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5433
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=blog_api
JWT_SECRET=super_secret_key
JWT_EXPIRES_IN=1d
```

3. Suba o PostgreSQL via Docker Compose:

```bash
docker compose up -d
```

4. Execute a aplicação:

```bash
npm run start:dev
```

A API será executada em `http://localhost:3000`.

## Endpoints principais

### Autenticação

- `POST /auth/login`
  - body: `{ "email": "user@example.com", "password": "senha" }`
  - retorna: `{ "access_token": "..." }`

### Usuários

- `POST /users` - criar usuário
- `GET /users` - listar usuários
- `GET /users/:id` - buscar usuário por id
- `PATCH /users/:id` - atualizar usuário
- `DELETE /users/:id` - remover usuário

### Posts

- `POST /posts` - criar post (autenticado)
- `GET /posts` - listar posts com paginação
- `GET /posts/:id` - buscar post por id
- `PATCH /posts/:id` - atualizar post
- `DELETE /posts/:id` - remover post

### Comentários

- `POST /comments` - criar comentário (autenticado)
- `GET /comments` - listar comentários
- `GET /comments/:id` - buscar comentário por id
- `PATCH /comments/:id` - atualizar comentário
- `DELETE /comments/:id` - remover comentário

## Observações importantes

### O que está pronto

- API de blog funcional com autenticação JWT
- Endpoints básicos de usuários, posts e comentários
- Paginação em `GET /posts`
- Relações entre usuário, post e comentário
- Validação de entrada e tratamento de erros básicos

### O que pode ser melhorado

- As rotas no `PostsController` estão protegidas por JWT no nível de classe, o que torna todas as rotas obrigatoriamente autenticadas. Para permitir leitura pública, proteja apenas os endpoints de criação/atualização/exclusão.
- Não há autorização para garantir que apenas o autor de um post/comentário possa editar ou remover o próprio recurso.
- O segredo JWT está hardcoded em `src/auth/auth.module.ts` e `src/auth/jwt.strategy.ts`; é melhor usar `process.env.JWT_SECRET`.
- `synchronize: true` está ativo no TypeORM. Funciona para desenvolvimento, mas não é recomendado para produção.
- Não existem migrações TypeORM configuradas.
- `src/config/database.config.ts` existe, mas não está sendo usado atualmente.

## Scripts úteis

- `npm run start:dev` - iniciar em modo de desenvolvimento
- `npm run build` - compilar o projeto
- `npm run start:prod` - iniciar aplicação compilada
- `npm run lint` - rodar ESLint
- `npm run test` - rodar testes
- `npm run test:e2e` - rodar testes end-to-end

## Como testar manualmente

1. Crie um usuário em `POST /users`.
2. Faça login em `POST /auth/login`.
3. Use o token retornado no cabeçalho `Authorization: Bearer <token>`.
4. Crie posts e comentários autenticados.

## Informações do curso

Este projeto faz parte da capacitação de Backend NestJS, com foco em conceitos centrais de NestJS e TypeORM.

- Curso Udemy: https://www.udemy.com/course/curso-de-reactjs-nextjs-completo-do-basico-ao-avancado
- Módulo 4: NestJS
- Módulo 9: TypeScript

## Observação final

O backend está funcional para grande parte dos requisitos, mas recomendo ajustar a proteção de rotas públicas e implementar autorização de donos antes de considerar o projeto 100% pronto.
