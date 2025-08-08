import { Injectable } from '@nestjs/common';
import { User } from '../../../domain/users/user';
import { UserRepository } from '../../../domain/users/user-repository';

@Injectable()
export class InMemoryUserRepository implements UserRepository {
  private readonly store = new Map<string, User>();

  create(user: User): Promise<User> {
    this.store.set(user.id, user);
    return Promise.resolve(user);
  }

  findById(id: string): Promise<User | null> {
    return Promise.resolve(this.store.get(id) ?? null);
  }

  findByEmail(email: string): Promise<User | null> {
    const lower = email.toLowerCase();
    for (const user of this.store.values()) {
      if (user.email === lower) return Promise.resolve(user);
    }
    return Promise.resolve(null);
  }

  findAll(): Promise<User[]> {
    return Promise.resolve(Array.from(this.store.values()));
  }

  update(user: User): Promise<User> {
    this.store.set(user.id, user);
    return Promise.resolve(user);
  }

  delete(id: string): Promise<void> {
    this.store.delete(id);
    return Promise.resolve();
  }
}
