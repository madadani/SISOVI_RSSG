export enum Role {
  PASIEN = 'PASIEN',
  PETUGAS = 'PETUGAS',
  ADMIN = 'ADMIN',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  password_hash: string;
  createdAt: Date;
}
