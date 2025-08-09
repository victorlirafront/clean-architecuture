<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

### Arquitetura (Clean Architecture)

Este projeto segue uma separação de camadas inspirada em Clean Architecture:

- **Domain**: regras e entidades de negócio. Não conhece HTTP, banco ou Nest.
  - `src/domain/users/user.ts` (entidade `User`)
  - `src/domain/users/user-repository.ts` (interface `UserRepository`)
- **Application**: casos de uso que orquestram o domínio. Dependem de interfaces (não de implementações).
  - `src/application/users/use-cases/*.use-case.ts`
  - `src/application/users/dto/*.dto.ts`
- **Infrastructure**: detalhes de entrega e persistência (Nest HTTP, repositório in-memory/DB, ViewModels).
  - HTTP: `src/infrastructure/http/users/*`
  - Persistência: `src/infrastructure/persistence/in-memory/in-memory-user.repository.ts`

#### Fluxo da requisição (HTTP → UseCase → Repository → Implementação)

1. Uma requisição HTTP chega ao `UsersController`.
2. O controller chama o caso de uso apropriado (`CreateUserUseCase`, `GetUserUseCase`, etc.).
3. O caso de uso depende da interface `UserRepository` (do Domain), injetada por token.
4. O `UsersModule` faz o binding do token `'UserRepository'` para a implementação concreta (aqui, `InMemoryUserRepository`).
5. O caso de uso retorna a entidade `User`; o controller a transforma para resposta HTTP com `UserViewModel`.

#### Onde isso aparece no código

- Controller (HTTP): `src/infrastructure/http/users/users.controller.ts`
- Casos de uso: `src/application/users/use-cases/*.use-case.ts`
- Interface do repositório (Domain): `src/domain/users/user-repository.ts`
- Implementação concreta (Infra): `src/infrastructure/persistence/in-memory/in-memory-user.repository.ts`
- ViewModel para resposta HTTP: `src/infrastructure/http/users/users.view-model.ts`
- Módulo que faz o binding (DI): `src/infrastructure/http/users/users.module.ts`

#### Injeção de dependências (DI)

Binding do token `'UserRepository'` para a implementação concreta no módulo:

```ts
// src/infrastructure/http/users/users.module.ts
@Module({
  controllers: [UsersController],
  providers: [
    { provide: 'UserRepository', useClass: InMemoryUserRepository },
    CreateUserUseCase,
    ListUsersUseCase,
    GetUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
  ],
})
export class UsersModule {}
```

Uso do token dentro do caso de uso (Application), dependendo da interface e não da implementação:

```ts
// src/application/users/use-cases/create-user.use-case.ts
@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}

  async execute(dto: CreateUserDto): Promise<User> {
    const existing = await this.userRepository.findByEmail(dto.email.toLowerCase());
    if (existing) throw new ConflictException('Email already in use');
    const user = new User({ id: randomUUID(), name: dto.name, email: dto.email });
    return this.userRepository.create(user);
  }
}
```

#### Entidade de domínio e regras

A entidade `User` normaliza o email e controla timestamps (`createdAt`, `updatedAt`), isolada de infraestrutura:

```ts
// src/domain/users/user.ts
constructor(props: Omit<UserProps, 'createdAt' | 'updatedAt'> & Partial<Pick<UserProps, 'createdAt' | 'updatedAt'>>) {
  this.id = props.id;
  this.name = props.name;
  this.email = props.email.toLowerCase();
  this.createdAt = props.createdAt ?? new Date();
  this.updatedAt = props.updatedAt ?? new Date();
}
```

#### DTOs e validação

Os DTOs (`CreateUserDto`, `UpdateUserDto`) validam a entrada. A validação global está em `src/main.ts` via `ValidationPipe`:

```ts
// src/main.ts
app.useGlobalPipes(new ValidationPipe({
  whitelist: true,
  transform: true,
  forbidNonWhitelisted: true,
}));
```

#### Como trocar a implementação do repositório

1. Crie uma classe que implemente `UserRepository` (ex.: `PrismaUserRepository`).
2. Ajuste o binding no `UsersModule` para usar a nova classe.

```ts
// src/infrastructure/http/users/users.module.ts
providers: [
  { provide: 'UserRepository', useClass: PrismaUserRepository },
  // demais providers...
]
```

Isso permite trocar a persistência (in-memory, Prisma, TypeORM, HTTP, etc.) sem alterar os casos de uso.

#### TL;DR

- Controller (Infra) → UseCase (Application) → `UserRepository` (Domain, interface) → Implementação concreta (Infra). Resposta: `User` → `UserViewModel` → JSON.
