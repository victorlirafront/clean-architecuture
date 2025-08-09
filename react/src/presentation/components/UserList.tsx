import type { User } from '../../domain/users/User';

interface Props {
  users: User[];
}

export function UserList({ users }: Props) {
  if (users.length === 0) {
    return <div className="card">Nenhum usuário cadastrado.</div>;
  }
  return (
    <div className="card">
      <table className="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Criado em</th>
            <th>Atualizado em</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td><time dateTime={u.createdAt}>{new Date(u.createdAt).toLocaleString()}</time></td>
              <td><time dateTime={u.updatedAt}>{new Date(u.updatedAt).toLocaleString()}</time></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 