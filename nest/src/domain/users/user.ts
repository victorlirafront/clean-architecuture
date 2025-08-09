export interface UserProps {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export class User implements UserProps {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    // O parâmetro 'props' combina:
    // - Omit<UserProps, 'createdAt' | 'updatedAt'>: exige id, name e email
    // - Partial<Pick<UserProps, 'createdAt' | 'updatedAt'>>: createdAt/updatedAt são opcionais
    // Isso permite criar um User com datas opcionais; se omitidas, serão definidas abaixo.
    props: Omit<UserProps, 'createdAt' | 'updatedAt'> &
      Partial<Pick<UserProps, 'createdAt' | 'updatedAt'>>,
  ) {
    this.id = props.id;
    this.name = props.name;
    // Normaliza o email para minúsculas para garantir consistência
    this.email = props.email.toLowerCase();
    // Define datas padrão: se não vierem no props, usa a data atual
    // '??' (nullish coalescing) só usa o valor da direita se o da esquerda for null ou undefined
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
  }

  updateName(name: string): void {
    this.name = name;
    this.touch();
  }

  updateEmail(email: string): void {
    this.email = email.toLowerCase();
    this.touch();
  }

  private touch(): void {
    this.updatedAt = new Date();
  }
}
