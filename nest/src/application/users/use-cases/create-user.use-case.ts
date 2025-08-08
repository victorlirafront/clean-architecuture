import { Inject, Injectable, ConflictException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { User } from '../../../domain/users/user';
import type { UserRepository } from '../../../domain/users/user-repository';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}

  async execute(dto: CreateUserDto): Promise<User> {
    const existing = await this.userRepository.findByEmail(
      dto.email.toLowerCase(),
    );
    if (existing) {
      throw new ConflictException('Email already in use');
    }
    const user = new User({
      id: randomUUID(),
      name: dto.name,
      email: dto.email,
    });
    return this.userRepository.create(user);
  }
}
