import type { ILocationRepository } from '../../domain/repositories/ILocationRepository';
import type { Location } from '../../domain/entities/Location';
import type { PrismaClient } from '@prisma/client';
export declare class PrismaLocationRepository implements ILocationRepository {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    findAllActive(): Promise<Location[]>;
    findById(id: string): Promise<Location | null>;
}
//# sourceMappingURL=PrismaLocationRepository.d.ts.map