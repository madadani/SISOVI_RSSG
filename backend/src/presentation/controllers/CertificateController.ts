import type { Request, Response } from 'express';
import type { GetCertificatesUseCase } from '../../application/use-cases/GetCertificatesUseCase';

export class CertificateController {
  constructor(private readonly getCertificatesUseCase: GetCertificatesUseCase) {}

  async getByPatient(req: Request, res: Response): Promise<void> {
    try {
      const { nik, dob } = req.query;
      if (!nik || !dob) {
        res.status(400).json({ error: 'NIK and DOB are required' });
        return;
      }
      const certs = await this.getCertificatesUseCase.execute(nik as string, dob as string);
      res.json(certs);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch certificates' });
    }
  }
}
