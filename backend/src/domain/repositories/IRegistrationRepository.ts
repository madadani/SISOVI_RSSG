import type { Registration } from '../entities/Registration';
import type { Patient } from '../entities/Patient';

export interface CreateRegistrationData {
  patientId: string;
  vaccineIds: string[];
  locationId: string;
  scheduleDate: Date;
  scheduleTime: string;
  queueNumber?: string;
  // New travel fields
  passportNumber?: string;
  namePassport1?: string;
  namePassport4?: string;
  destinationCountry?: string;
  serviceType?: string;
  departureDate?: Date;
}

export interface RegistrationWithPatient extends Registration {
  patient: Patient;
}

export interface IRegistrationRepository {
  create(data: CreateRegistrationData): Promise<Registration>;
  findById(id: string): Promise<Registration | null>;
  findByPatientId(patientId: string): Promise<Registration[]>;
  countAll(): Promise<number>;
  countByDate(date: Date): Promise<number>;
  findRecent(limit: number): Promise<RegistrationWithPatient[]>;
  findByQueueNumber(queueNumber: string): Promise<RegistrationWithPatient | null>;
  countByDateRange(start: Date, end: Date): Promise<number>;
}
