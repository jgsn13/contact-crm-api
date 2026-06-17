# Contact CRM API

API REST para cadastro de usuarios, autenticacao com JWT e gerenciamento de contatos, interacoes, oportunidades de vendas e dashboard do CRM.

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
- Criacao, listagem, busca, atualizacao e remocao de contatos
- Listagem de contatos com filtro textual
- Listagem de contatos por tag
- Cadastro, listagem e remocao de interacoes de contatos
- Criacao, listagem, busca, atualizacao e remocao de oportunidades de vendas
- Dashboard com resumo de contatos, oportunidades e valores

## Estrutura principal

- `src/auth/`: autenticacao, login, cadastro e validacao de token
- `src/user/`: consulta do perfil do usuario autenticado
- `src/contact/`: operacoes de contatos e interacoes
- `src/opportunity/`: operacoes de oportunidades de vendas
- `src/dashboard/`: resumo geral do CRM
- `src/prisma/`: integracao da aplicacao com o Prisma Client
- `prisma/schema.prisma`: configuracao do banco e modelos da aplicacao
- `prisma/migrations/`: historico de migracoes do banco
- `requests/`: exemplos de requisicoes HTTP para teste manual

## Requisitos

- Node.js 20 ou superior
- npm

## Como executar

1. Instale as dependencias:

```bash
npm install
```

2. Gere o Prisma Client:

```bash
npm exec prisma generate
```

3. Aplique as migracoes no banco local, se necessario:

```bash
npm exec prisma migrate deploy
```

4. Inicie a API em modo de desenvolvimento:

```bash
npm run start:dev
```

5. A aplicacao ficara disponivel em:

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

As migracoes existentes estao em:

```text
prisma/migrations/
```

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
- `GET /contact/:contactId`
- `PUT /contact/:contactId`
- `DELETE /contact/:contactId`
- `GET /contact/tags`

### Interacoes de contatos

- `POST /contact/:contactId/interactions`
- `GET /contact/:contactId/interactions`
- `DELETE /contact/interactions/:interactionId`

Tipos permitidos:

- `call`
- `email`
- `meeting`
- `note`

### Oportunidades de vendas

- `POST /opportunities`
- `GET /opportunities`
- `GET /opportunities/:opportunityId`
- `PUT /opportunities/:opportunityId`
- `DELETE /opportunities/:opportunityId`

Status permitidos:

- `open`
- `won`
- `lost`

### Dashboard

- `GET /dashboard`

O dashboard retorna:

- total de contatos
- total de oportunidades
- total de oportunidades ganhas
- total de oportunidades perdidas
- valor total estimado
- valor total ganho

## Exemplos de requisicoes

### Cadastro de usuario

```http
POST /auth/sign-up
Content-Type: application/json

{
  "name": "Arthur",
  "email": "arthur@email.com",
  "password": "123456"
}
```

### Login

```http
POST /auth/sign-in
Content-Type: application/json

{
  "email": "arthur@email.com",
  "password": "123456"
}
```

### Criacao de contato

```http
POST /contact
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Maria Silva",
  "email": "maria@email.com",
  "phone": "88999999999",
  "company": "Acme",
  "status": "lead",
  "tag": "customer"
}
```

### Criacao de interacao

```http
POST /contact/<contactId>/interactions
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "email",
  "description": "Sent commercial proposal",
  "occurredAt": "2026-06-17T13:30:00.000Z"
}
```

### Criacao de oportunidade

```http
POST /opportunities
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "New support contract",
  "description": "Annual support plan",
  "pipelineStage": "proposal",
  "estimatedValue": 12000,
  "status": "open",
  "contactId": "<contactId>"
}
```

## Fluxo basico de uso

1. Crie um usuario em `POST /auth/sign-up`.
2. Faca login em `POST /auth/sign-in`.
3. Copie o token retornado.
4. Envie o token no cabecalho `Authorization: Bearer <token>`.
5. Cadastre contatos em `POST /contact`.
6. Registre interacoes em `POST /contact/:contactId/interactions`.
7. Cadastre oportunidades em `POST /opportunities`.
8. Consulte o resumo em `GET /dashboard`.

## Teste manual com os arquivos HTTP

O diretorio `requests/` contem exemplos prontos para testar a API:

- `sign-up.http`
- `sign-in.http`
- `profile.http`
- `create-contact.http`
- `get-contact.http`
- `list-contacts.http`
- `list-contacts-by-tag.http`
- `list-tags.http`
- `update-contact.http`
- `delete-contact.http`
- `create-contact-interaction.http`
- `list-contact-interactions.http`
- `delete-contact-interaction.http`
- `create-opportunity.http`
- `list-opportunities.http`
- `get-opportunity.http`
- `update-opportunity.http`
- `delete-opportunity.http`
- `dashboard.http`

Esses arquivos podem ser executados em extensoes de cliente HTTP no VS Code, como REST Client.

## GitFlow

O projeto utiliza um fluxo baseado em GitFlow:

- `main`: versao estavel
- `develop`: desenvolvimento integrado
- `feature/*`: novas funcionalidades
- `release/*`: preparacao de versao
- `hotfix/*`: correcoes urgentes
- tags `vX.Y.Z`: versoes publicadas

## Observacoes de implementacao

- A autenticacao usa JWT com expiracao de 1 dia.
- A senha do usuario e armazenada com `bcrypt`.
- O projeto aplica `ValidationPipe` global no bootstrap da aplicacao.
- As rotas de contatos, interacoes, oportunidades e dashboard exigem token JWT.
- As consultas de contatos, interacoes, oportunidades e dashboard sao filtradas pelo usuario autenticado.
