export interface Vaccine {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  stock: number;
  isActive: boolean;
}
