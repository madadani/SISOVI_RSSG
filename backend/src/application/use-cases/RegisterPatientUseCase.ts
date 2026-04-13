import type { IPatientRepository } from '../../domain/repositories/IPatientRepository';
import type { IRegistrationRepository } from '../../domain/repositories/IRegistrationRepository';
import type { IScreeningAnswerRepository } from '../../domain/repositories/IScreeningAnswerRepository';
import type { RegisterPatientDTO } from '../dtos/RegisterPatientDTO';
import type { RegistrationResponseDTO } from '../dtos/RegistrationResponseDTO';

export class RegisterPatientUseCase {
  constructor(
    private readonly patientRepository: IPatientRepository,
    private readonly registrationRepository: IRegistrationRepository,
    private readonly screeningAnswerRepository: IScreeningAnswerRepository,
  ) {}

  async execute(dto: RegisterPatientDTO): Promise<RegistrationResponseDTO> {
    console.log('Registering patient with DTO:', JSON.stringify(dto, null, 2));
    try {
      // 1. Find or create patient
      let patient = await this.patientRepository.findByNik(dto.nik);

      if (!patient) {
        const bd = new Date(dto.birthdate);
        if (isNaN(bd.getTime())) {
          throw new Error(`Invalid birthdate: ${dto.birthdate}`);
        }
        patient = await this.patientRepository.create({
          nik: dto.nik,
          name: dto.name,
          birthdate: bd,
          gender: dto.gender,
          phone: dto.phone,
          address: dto.address ?? null,
          no_rm: dto.no_rm ?? null,
        });
      }

      // 2. Generate queue number (format: V001, V
      // 002, ...)
      const today = new Date();
      const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000);

      const todayCount = await this.registrationRepository.countByDateRange(startOfDay, endOfDay);
      const nextNum = String(todayCount + 1).padStart(3, '0');
      const queueNumber = `A${nextNum}`;

      // 3. Create registration
      const sd = new Date(dto.scheduleDate);
      if (isNaN(sd.getTime())) {
        throw new Error(`Invalid scheduleDate: ${dto.scheduleDate}`);
      }

      let departureDate: Date | undefined = undefined;
      if (dto.departureDate && dto.departureDate.trim() !== '') {
        const dd = new Date(dto.departureDate);
        if (!isNaN(dd.getTime())) {
          departureDate = dd;
        }
      }

      const registration = await this.registrationRepository.create({
        patientId: patient.id,
        vaccineIds: dto.vaccineIds,
        locationId: dto.locationId,
        scheduleDate: sd,
        scheduleTime: dto.scheduleTime,
        queueNumber,
        // New travel fields
        passportNumber: dto.passportNumber,
        namePassport1: dto.namePassport1,
        namePassport4: dto.namePassport4,
        destinationCountry: dto.destinationCountry,
        serviceType: dto.serviceType,
        departureDate,
      });

      // 4. Save screening answers
      if (dto.answers && dto.answers.length > 0) {
        const answerData = dto.answers.map((a) => ({
          registrationId: registration.id,
          questionId: a.questionId,
          answer: a.answer,
        }));
        await this.screeningAnswerRepository.createMany(answerData);
      }

      return {
        success: true,
        message: 'Registration successful',
        data: {
          registrationId: registration.id,
          queueNumber,
          patientName: patient.name,
          scheduleDate: dto.scheduleDate,
          scheduleTime: dto.scheduleTime,
        },
      };
    } catch (error: any) {
      console.error('Registration error details:', error);
      // More descriptive error for specific cases
      if (error.code === 'P2002') {
        throw new Error('Data sudah terdaftar (P2002). Mohon gunakan nomor passport/NIK yang berbeda atau coba beberapa saat lagi.');
      }
      throw error;
    }
  }
}
