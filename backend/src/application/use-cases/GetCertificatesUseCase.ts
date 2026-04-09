import type { ICertificateRepository } from '../../domain/repositories/ICertificateRepository';

export class GetCertificatesUseCase {
  constructor(private readonly certificateRepository: ICertificateRepository) {}

  async execute(nik: string, dob: string) {
    return this.certificateRepository.findByPatientNikAndDob(nik, new Date(dob));
  }
}
