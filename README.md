# Contact CRM API

API REST para cadastro de usuarios, autenticacao com JWT e gerenciamento de contatos.

## Tecnologias

- NestJS
- TypeScript
- Prisma
- SQLite
- JWT
- Jest

## Funcionalidades

- Cadastro de usuario
- Login com retorno de token JWT
- Consulta do perfil do usuario autenticado
- Criacao de contatos
- Listagem de contatos com filtro textual
- Listagem de contatos por tag
- Atualizacao de contatos
- Remocao de contatos
- Listagem das tags existentes

## Estrutura principal

- `src/auth/`: autenticacao, login, cadastro e validacao de token
- `src/user/`: consulta do perfil do usuario autenticado
- `src/contact/`: operacoes CRUD de contatos e filtros por tag
- `src/prisma/`: integracao da aplicacao com o Prisma Client
- `prisma/schema.prisma`: configuracao do banco e modelos `User` e `Contact`
- `requests/`: exemplos de requisicoes HTTP para teste manual

## Requisitos

- Node.js 20 ou superior
- npm

## Como executar

1. Instale as dependencias:

```bash
npm install
```

2. Inicie a API em modo de desenvolvimento:

```bash
npm run start:dev
```

3. A aplicacao ficara disponivel em:

```text
http://localhost:3000
```

Se a variavel `PORT` estiver definida, a API usara esse valor no lugar de `3000`.

## Banco de dados

O projeto usa SQLite com arquivo local configurado em `prisma/schema.prisma`:

```text
file:dev.db
```

O banco versionado no repositorio esta em:

```text
prisma/dev.db
```

As migracoes existentes estao em `prisma/migrations/`.

## Scripts disponiveis

```bash
npm run build
npm run start
npm run start:dev
npm run start:debug
npm run start:prod
npm run lint
npm run test
npm run test:watch
npm run test:cov
npm run test:e2e
```

## Endpoints principais

### Autenticacao

- `POST /auth/sign-up`
- `POST /auth/sign-in`

### Usuario

- `GET /user/profile`

### Contatos

- `POST /contact`
- `GET /contact/list`
- `GET /contact/list/:tag`
- `PUT /contact/:contactId`
- `DELETE /contact/:contactId`
- `GET /contact/tags`

## Fluxo basico de uso

1. Crie um usuario em `POST /auth/sign-up`
2. Faça login em `POST /auth/sign-in`
3. Copie o token retornado
4. Envie o token no cabecalho `Authorization: Bearer <token>`
5. Acesse `GET /user/profile` e os endpoints de `contact`

## Teste manual com os arquivos HTTP

O diretorio `requests/` contem exemplos prontos para testar a API:

- `sign-up.http`
- `sign-in.http`
- `profile.http`
- `create-contact.http`
- `list-contacts.http`
- `list-contacts-by-tag.http`
- `list-tags.http`
- `update-contact.http`
- `delete-contact.http`

Esses arquivos podem ser executados em extensoes de cliente HTTP no VS Code, como REST Client.

## Observacoes de implementacao

- A autenticacao usa JWT com expiracao de 1 dia.
- A senha do usuario e armazenada com `bcrypt`.
- O projeto aplica `ValidationPipe` global no bootstrap da aplicacao.
- O modulo principal importa `AuthModule`, `UserModule` e `ContactModule`.
