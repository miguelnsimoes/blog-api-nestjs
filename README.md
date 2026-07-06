# Blog API NestJS

Este é um backend de blog em NestJS com autenticação JWT, posts e comentários.

## Como clonar e testar

1. Clone o repositório:

```bash
git clone <URL_DO_REPOSITORIO>
cd blog-api-nestjs
```

2. Instale dependências:

```bash
npm install
```

3. Crie um arquivo `.env` na raiz do projeto com as variáveis abaixo:

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

4. Inicie o banco de dados PostgreSQL com Docker Compose:

```bash
docker compose up -d
```

5. Inicie o servidor:

```bash
npm run start:dev
```

6. Acesse a API em:

```text
http://localhost:3000
```

## Testando com Postman

1. Importe o arquivo `blog-api-nestjs.postman_collection.json`.
2. Defina a variável `base_url` como `http://localhost:3000`.
3. Crie um usuário usando `POST /users`.
4. Faça login em `POST /auth/login` e use o token retornado.
5. Teste os demais endpoints com `Authorization: Bearer <token>`.

## Endpoints principais

- `POST /users`
- `POST /auth/login`
- `GET /users`
- `GET /users/:id`
- `PATCH /users/:id`
- `DELETE /users/:id`
- `POST /posts`
- `GET /posts`
- `GET /posts/:id`
- `PATCH /posts/:id`
- `DELETE /posts/:id`
- `POST /comments`
- `GET /comments`
- `GET /comments/:id`
- `PATCH /comments/:id`
- `DELETE /comments/:id`

