import { useEffect, useMemo, useState } from 'react';
import { ListUsersUseCase } from '../../application/users/use-cases/ListUsersUseCase';
import { CreateUserUseCase } from '../../application/users/use-cases/CreateUserUseCase';
import type { User } from '../../domain/users/User';
import { UserHttpRepository } from '../../infrastructure/http/UserHttpRepository';
import { HttpClient, HttpError } from '../../infrastructure/http/HttpClient';
import { UserForm } from '../components/UserForm';
import { UserList } from '../components/UserList';
import { UserMemoryRepository } from '../../infrastructure/memory/UserMemoryRepository';

export function UsersPage() {
  const apiBase = import.meta.env.VITE_API_BASE_URL ?? 'mock';
  const repo = useMemo(() => {
    if (apiBase === 'mock') return new UserMemoryRepository();
    const http = new HttpClient(apiBase);
    return new UserHttpRepository(http);
  }, [apiBase]);

  const listUsers = useMemo(() => new ListUsersUseCase(repo), [repo]);
  const createUser = useMemo(() => new CreateUserUseCase(repo), [repo]);

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await listUsers.execute();
      setUsers(data);
    } catch (err) {
      const msg = err instanceof HttpError ? err.message : 'Falha ao carregar usuários';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiBase]);

  return (
    <div className="container vstack" style={{ gap: 16 }}>
      <header className="vstack" style={{ gap: 4 }}>
        <h1 className="title">Usuários</h1>
        <span className="subtle small">React + TypeScript · Clean Architecture</span>
      </header>

      <UserForm
        createUser={createUser}
        onCreated={(u) => {
          setUsers((prev) => [u, ...prev]);
        }}
      />

      {loading ? (
        <div className="card">Carregando...</div>
      ) : error ? (
        <div className="card error">{error}</div>
      ) : (
        <UserList users={users} />
      )}

      <footer className="small subtle">Modo: {apiBase === 'mock' ? 'mock' : `API ${apiBase}`}</footer>
    </div>
  );
} 