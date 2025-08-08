import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { UserRepository } from '../../../domain/users/user-repository';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const existing = await this.userRepository.findById(id);
    if (!existing) throw new NotFoundException('User not found');
    await this.userRepository.delete(id);
  }
}
