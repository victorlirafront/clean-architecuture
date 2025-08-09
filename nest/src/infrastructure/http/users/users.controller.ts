import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserUseCase } from '../../../application/users/use-cases/create-user.use-case';
import { ListUsersUseCase } from '../../../application/users/use-cases/list-users.use-case';
import { GetUserUseCase } from '../../../application/users/use-cases/get-user.use-case';
import { UpdateUserUseCase } from '../../../application/users/use-cases/update-user.use-case';
import { DeleteUserUseCase } from '../../../application/users/use-cases/delete-user.use-case';
import { CreateUserDto } from '../../../application/users/dto/create-user.dto';
import { UpdateUserDto } from '../../../application/users/dto/update-user.dto';
import { UserViewModel } from './users.view-model';

@Controller('users')
export class UsersController {
  constructor(
    // Injeta automaticamente (via Dependency Injection do NestJS) a instância do caso de uso responsável por criar usuários.
    // 'private readonly' garante que só será acessível dentro desta classe e não poderá ter seu valor alterado após o construtor.
    private readonly createUser: CreateUserUseCase,
    private readonly listUsers: ListUsersUseCase,
    private readonly getUser: GetUserUseCase,
    private readonly updateUser: UpdateUserUseCase,
    private readonly deleteUser: DeleteUserUseCase,
  ) {}

  // Define que este método responderá a requisições HTTP POST na rota associada ao controller
  @Post()
  async create(@Body() dto: CreateUserDto) {
    //@Body() extrai o corpo da requisição e valida contra o CreateUserDto.
    // Chama o caso de uso (service/use case) para criar um novo usuário,
    // passando os dados recebidos no corpo da requisição (dto = Data Transfer Object)
    const user = await this.createUser.execute(dto);

    // Converte o objeto de domínio 'user' para um formato compatível com a resposta HTTP
    // Isso é útil para evitar expor diretamente a estrutura interna do objeto de domínio
    return UserViewModel.toHTTP(user);
  }

  @Get()
  async findAll() {
    const users = await this.listUsers.execute();
    return users.map((u) => UserViewModel.toHTTP(u));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.getUser.execute(id);
    return UserViewModel.toHTTP(user);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    const user = await this.updateUser.execute(id, dto);
    return UserViewModel.toHTTP(user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.deleteUser.execute(id);
    return { status: 'ok' };
  }
}
