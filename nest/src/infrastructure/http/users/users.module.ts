import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { InMemoryUserRepository } from '../../persistence/in-memory/in-memory-user.repository';
import { CreateUserUseCase } from '../../../application/users/use-cases/create-user.use-case';
import { ListUsersUseCase } from '../../../application/users/use-cases/list-users.use-case';
import { GetUserUseCase } from '../../../application/users/use-cases/get-user.use-case';
import { UpdateUserUseCase } from '../../../application/users/use-cases/update-user.use-case';
import { DeleteUserUseCase } from '../../../application/users/use-cases/delete-user.use-case';

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
