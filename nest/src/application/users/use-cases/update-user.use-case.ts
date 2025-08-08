import {
  Inject,
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../../../domain/users/user';
import type { UserRepository } from '../../../domain/users/user-repository';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}

  async execute(id: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException('User not found');

    if (dto.email && dto.email.toLowerCase() !== user.email) {
      const existing = await this.userRepository.findByEmail(
        dto.email.toLowerCase(),
      );
      if (existing && existing.id !== id) {
        throw new ConflictException('Email already in use');
      }
      user.updateEmail(dto.email);
    }

    if (dto.name) {
      user.updateName(dto.name);
    }

    return this.userRepository.update(user);
  }
}
