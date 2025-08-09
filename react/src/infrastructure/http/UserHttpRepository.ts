import type { User } from '../../domain/users/User';
import type { CreateUserInput, UserRepository } from '../../domain/users/UserRepository';
import { HttpClient } from './HttpClient';

export class UserHttpRepository implements UserRepository {
  constructor(private readonly http: HttpClient) {}

  list(): Promise<User[]> {
    return this.http.get<User[]>('/users');
  }

  create(input: CreateUserInput): Promise<User> {
    return this.http.post<User>('/users', input);
  }
} 