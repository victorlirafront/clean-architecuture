# React Clean Frontend (practice-01)

Front-end em React + TypeScript organizado com Clean Architecture.

Por padrão, o app roda em modo **mock (memória)**: os dados ficam em um array em memória no próprio frontend. Não é necessário subir nenhuma API.

## Rodando

1. Entre na pasta `react/practice-01/` e instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o dev server:
   ```bash
   npm run dev
   ```
3. Acesse `http://localhost:5173`.

## Modos de dados

- Padrão: `mock` (memória) — usa `UserMemoryRepository`, salvando em um array em memória no navegador.
- Para consumir uma API (opcional), defina `VITE_API_BASE_URL`:
  ```bash
  # Exemplo PowerShell (sessão atual)
  $env:VITE_API_BASE_URL = "http://localhost:3000"; npm run dev
  ```

## Estrutura (Clean Architecture)

- `src/domain/` — modelos e contratos (ex.: `User`, `UserRepository`).
- `src/application/` — casos de uso (ex.: `ListUsersUseCase`, `CreateUserUseCase`).
- `src/infrastructure/` — implementações concretas (ex.: `UserMemoryRepository`, `UserHttpRepository`).
- `src/presentation/` — UI (componentes e páginas React).

## Notas

- O modo mock não persiste após recarregar a página.
- Para usar uma API, certifique-se de expor rotas `GET /users` e `POST /users` com o mesmo contrato usado aqui. 