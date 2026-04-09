import type { Patient } from '../entities/Patient';

export interface IPatientRepository {
  findByNik(nik: string): Promise<Patient | null>;
  findById(id: string): Promise<Patient | null>;
  create(data: Omit<Patient, 'id'>): Promise<Patient>;
  update(id: string, data: Partial<Patient>): Promise<Patient>;
  countAll(): Promise<number>;
}
