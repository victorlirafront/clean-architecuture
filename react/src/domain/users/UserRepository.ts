import type { User } from './User';

export interface CreateUserInput {
  name: string;
  email: string;
}

export interface UserRepository {
  list(): Promise<User[]>;
  create(input: CreateUserInput): Promise<User>;
} 