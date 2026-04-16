# Item de Configuração: `package.json`
- **ID:** IC-001
- **Tipo:** Configuração de build e execução
- **Versao:** 0.0.1
- **Repositorio:** https://github.com/jgsn13/contact-crm-api.git
- **Branch:** main
- **Commit ID:** 1f8c917
- **Mudancas:** Define as dependencias centrais da API (`@nestjs/*`, `@prisma/client`, `bcrypt`, `class-validator`), os scripts de build, execucao e testes (`build`, `start:*`, `test:*`) e a Configuração embutida do Jest.
- **Data Release:** 15/04/2026

# Item de Configuração: `schema.prisma`

- **ID:** IC-002
- **Tipo:** Configuração de banco de dados
- **Versao:** 0.0.1
- **Repositorio:** https://github.com/jgsn13/contact-crm-api.git
- **Branch:** main
- **Commit ID:** 1f8c917
- **Mudancas:** Configura o datasource SQLite (`file:dev.db`), o generator do cliente Prisma e a estrutura persistente dos modelos `User` e `Contact`, incluindo restricoes de unicidade para `email` e `phone`.
- **Data Release:** 15/04/2026

# Item de Configuração: `nest-cli.json`

- **ID:** IC-003
- **Tipo:** Configuração de framework
- **Versao:** 0.0.1
- **Repositorio:** https://github.com/jgsn13/contact-crm-api.git
- **Branch:** main
- **Commit ID:** 1f8c917
- **Mudancas:** Define `src` como `sourceRoot`, utiliza `@nestjs/schematics` e habilita `deleteOutDir`, que limpa o diretorio de saida antes de cada build.
- **Data Release:** 15/04/2026

# Item de Configuração: `tsconfig.json`

- **ID:** IC-004
- **Tipo:** Configuração de compilacao
- **Versao:** 0.0.1
- **Repositorio:** https://github.com/jgsn13/contact-crm-api.git
- **Branch:** main
- **Commit ID:** 1f8c917
- **Mudancas:** Configuração do compilador TypeScript.
- **Data Release:** 15/04/2026

# Item de Configuração: `eslint.config.mjs`

- **ID:** IC-005
- **Tipo:** Configuração de qualidade de codigo
- **Versao:** 0.0.1
- **Repositorio:** https://github.com/jgsn13/contact-crm-api.git
- **Branch:** main
- **Commit ID:** 1f8c917
- **Mudancas:** Define regras de lint para o codigo TypeScript do projeto e fixa o padrao automatico de formatação aplicado durante o desenvolvimento.
- **Data Release:** 15/04/2026

# Item de Configuração: `README.md`

- **ID:** IC-006
- **Tipo:** Documento
- **Versao:** 0.0.1
- **Repositorio:** https://github.com/jgsn13/contact-crm-api.git
- **Branch:** main
- **Commit ID:** 1f8c917
- **Mudancas:** Documenta como instalar dependencias, executar a API, localizar o banco SQLite, usar os scripts npm e testar os endpoints principais com os arquivos da pasta `requests/`.
- **Data Release:** 15/04/2026

# Item de Configuração: `src/main.ts`

- **ID:** IC-007
- **Tipo:** Codigo-fonte principal
- **Versao:** 0.0.1
- **Repositorio:** https://github.com/jgsn13/contact-crm-api.git
- **Branch:** main
- **Commit ID:** 1f8c917
- **Mudancas:** Inicializa a aplicação NestJS, aplica `ValidationPipe` global, define a porta de execucao e compoe os modulos `AuthModule`, `UserModule` e `ContactModule` que estruturam a API.
- **Data Release:** 15/04/2026

# Item de Configuração: `auth.service.ts`

- **ID:** IC-008
- **Tipo:** Codigo-fonte principal
- **Versao:** 0.0.1
- **Repositorio:** https://github.com/jgsn13/contact-crm-api.git
- **Branch:** main
- **Commit ID:** 1f8c917
- **Mudancas:** Implementa o cadastro e login com `bcrypt` e JWT em `auth.service.ts`.
- **Data Release:** 15/04/2026
