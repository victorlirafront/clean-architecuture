import type { User } from '../../../domain/users/User';
import type { UserRepository } from '../../../domain/users/UserRepository';

export class ListUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<User[]> {
    return this.userRepository.list();
  }
} 