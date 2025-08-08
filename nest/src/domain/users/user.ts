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
    props: Omit<UserProps, 'createdAt' | 'updatedAt'> &
      Partial<Pick<UserProps, 'createdAt' | 'updatedAt'>>,
  ) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email.toLowerCase();
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
