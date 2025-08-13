import { useState } from 'react';
import type { CreateUserUseCase } from '../../application/users/use-cases/CreateUserUseCase';
import type { User } from '../../domain/users/User';

interface Props {
  createUser: CreateUserUseCase;
  onCreated(user: User): void;
}

export function UserForm({ createUser, onCreated }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!name.trim() || !email.trim()) {
      setError('Preencha nome e email.');
      return;
    }
    setLoading(true);
    try {
      const user = await createUser.execute({ name: name.trim(), email: email.trim() });
      onCreated(user);
      setName('');
      setEmail('');
      setSuccess('Usuário criado com sucesso.');
    } catch (err: any) {
      const msg = err?.message ?? 'Erro ao criar usuário';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="vstack card" style={{ gap: 8 }}>
      <h2 className="title">Novo usuário</h2>
      <div className="hstack">
        <input
          className="input"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
        />
        <input
          className="input"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <button className="button" type="submit" disabled={loading}>Criar</button>
      </div>
      <div className="hstack" style={{ justifyContent: 'space-between' }}>
        <span className="small subtle">Campos: nome e email</span>
        {loading && <span className="small">Enviando...</span>}
      </div>
      {error && <div className="error small">{error}</div>}
      {success && <div className="success small">{success}</div>}
    </form>
  );
} 