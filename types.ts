export enum Gender {
  MALE = 'Masculino',
  FEMALE = 'Feminino',
  OTHER = 'Outro'
}

export interface WeightEntry {
  id: string;
  date: string; // ISO string
  weight: number;
  note?: string;
}

export interface UserProfile {
  name: string;
  gender: Gender;
  age: number;
  height: number; // in cm
  targetWeight: number;
  startWeight: number;
  startDate: string;
}

export interface AppData {
  profile: UserProfile | null;
  logs: WeightEntry[];
}
