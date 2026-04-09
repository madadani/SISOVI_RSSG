export interface ScreeningQuestion {
  id: string;
  questionText: string;
  category?: string | null;
  isActive: boolean;
}
