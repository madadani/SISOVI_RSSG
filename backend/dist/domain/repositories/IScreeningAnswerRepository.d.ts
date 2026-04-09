import type { ScreeningAnswer } from '../entities/ScreeningAnswer';
export interface CreateScreeningAnswerData {
    registrationId: string;
    questionId: string;
    answer: boolean;
}
export interface IScreeningAnswerRepository {
    createMany(data: CreateScreeningAnswerData[]): Promise<number>;
    findByRegistrationId(registrationId: string): Promise<ScreeningAnswer[]>;
}
//# sourceMappingURL=IScreeningAnswerRepository.d.ts.map