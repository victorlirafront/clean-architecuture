import type { User } from '../../../domain/users/User';
import type { CreateUserInput, UserRepository } from '../../../domain/users/UserRepository';

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: CreateUserInput): Promise<User> {
    return this.userRepository.create(input);
  }
} 