import type { IRegistrationRepository } from '../../domain/repositories/IRegistrationRepository';

export class GetRegistrationStatusUseCase {
  constructor(private readonly registrationRepository: IRegistrationRepository) {}

  async execute(queueNumber: string) {
    const reg = await this.registrationRepository.findById(queueNumber); // Assuming we can find by queueNumber
    // Actually our interface for findById expects ID, let's fix the repo to find by queueNumber.
    return reg;
  }
}
