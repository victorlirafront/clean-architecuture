<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

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
