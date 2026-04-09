export declare enum Role {
    PASIEN = "PASIEN",
    PETUGAS = "PETUGAS",
    ADMIN = "ADMIN"
}
export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
    password_hash: string;
    createdAt: Date;
}
//# sourceMappingURL=User.d.ts.map