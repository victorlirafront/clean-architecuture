import { Injectable } from '@nestjs/common';
import { User } from '../../../domain/users/user';
import { UserRepository } from '../../../domain/users/user-repository';

@Injectable()
export class InMemoryUserRepository implements UserRepository {
  private readonly store = new Map<string, User>();

  async create(user: User): Promise<User> {
    this.store.set(user.id, user);
    return user;
  }

  async findById(id: string): Promise<User | null> {
    return this.store.get(id) ?? null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const lower = email.toLowerCase();
    for (const user of this.store.values()) {
      if (user.email === lower) return user;
    }
    return null;
  }

  async findAll(): Promise<User[]> {
    return Array.from(this.store.values());
  }

  async update(user: User): Promise<User> {
    this.store.set(user.id, user);
    return user;
  }

  async delete(id: string): Promise<void> {
    this.store.delete(id);
  }
}
