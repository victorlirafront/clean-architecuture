import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../../../domain/users/user';
import type { UserRepository } from '../../../domain/users/user-repository';

@Injectable()
export class GetUserUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}

  async execute(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
