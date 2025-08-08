import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../../domain/users/user';
import type { UserRepository } from '../../../domain/users/user-repository';

@Injectable()
export class ListUsersUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}

  async execute(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
