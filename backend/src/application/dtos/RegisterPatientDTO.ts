export interface RegisterPatientDTO {
  nik: string;
  name: string;
  birthdate: string;
  gender: string;
  phone: string;
  address?: string;
  no_rm?: string;
  locationId: string;
  vaccineIds: string[];
  scheduleDate: string;
  scheduleTime: string;
  // New travel fields
  passportNumber?: string;
  namePassport1?: string;
  namePassport4?: string;
  destinationCountry?: string;
  serviceType?: string;
  departureDate?: string;
  answers: Array<{
    questionId: string;
    answer: boolean;
  }>;
}
