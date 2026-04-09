import type { ICertificateRepository, Certificate } from '../../domain/repositories/ICertificateRepository';
import type { PrismaClient } from '@prisma/client';

export class PrismaCertificateRepository implements ICertificateRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findByPatientNikAndDob(nik: string, dob: Date): Promise<Certificate[]> {
    const certs = await this.prisma.certificate.findMany({
      where: {
        patient: {
          nik: nik,
          birthdate: dob
        }
      },
      include: {
        patient: true,
        vaccine: true
      }
    });

    return certs.map(c => ({
      id: c.id,
      patientId: c.patientId,
      vaccineName: c.vaccine.name,
      certificateNumber: c.id, 
      issueDate: c.issuedDate,
      batchNumber: c.batchNumber,
      patient: c.patient as any
    })) as unknown as Certificate[];
  }

  async findById(id: string): Promise<Certificate | null> {
    const cert = await this.prisma.certificate.findUnique({
      where: { id },
      include: {
        patient: true,
        vaccine: true
      }
    });
    if (!cert) return null;
    return cert as unknown as Certificate;
  }
}
