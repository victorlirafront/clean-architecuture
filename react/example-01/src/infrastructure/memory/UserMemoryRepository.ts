import type { User } from '../../domain/users/User';
import type { CreateUserInput, UserRepository } from '../../domain/users/UserRepository';

export class UserMemoryRepository implements UserRepository {
  private users: User[] = [
    {
      id: 'u_1',
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      updatedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    },
  ];

  async list(): Promise<User[]> {
    return [...this.users].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  async create(input: CreateUserInput): Promise<User> {
    const now = new Date().toISOString();
    const user: User = {
      id: crypto?.randomUUID ? crypto.randomUUID() : `u_${Math.random().toString(36).slice(2, 10)}`,
      name: input.name,
      email: input.email.toLowerCase(),
      createdAt: now,
      updatedAt: now,
    };
    this.users.unshift(user);
    return user;
  }
} 