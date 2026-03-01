import api from './api';

export interface DietRecord {
  _id: string;
  petId: string;
  date: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  foodType: string;
  amount: number;
  unit: 'g' | 'cup' | 'can';
  notes?: string;
  createdAt: string;
}

export interface CreateDietParams {
  date: string;
  mealType: string;
  foodType: string;
  amount: number;
  unit: string;
  notes?: string;
}

export const dietApi = {
  getAll: (petId: string, params?: { startDate?: string; endDate?: string }) => 
    api.get<any, DietRecord[]>(`/pets/${petId}/diet`, { params }),

  create: (petId: string, data: CreateDietParams) => 
    api.post<any, DietRecord>(`/pets/${petId}/diet`, data),

  update: (petId: string, id: string, data: Partial<CreateDietParams>) => 
    api.put<any, DietRecord>(`/pets/${petId}/diet/${id}`, data),

  delete: (petId: string, id: string) => 
    api.delete(`/pets/${petId}/diet/${id}`),
};

export interface VaccineRecord {
  _id: string;
  petId: string;
  vaccineName: string;
  type: 'rabies' | 'combined' | 'other';
  inoculationDate: string;
  nextDate?: string;
  hospital?: string;
  notes?: string;
  createdAt: string;
}

export interface CreateVaccineParams {
  vaccineName: string;
  type: string;
  inoculationDate: string;
  nextDate?: string;
  hospital?: string;
  notes?: string;
}

export const vaccineApi = {
  getAll: (petId: string) => 
    api.get<any, VaccineRecord[]>(`/pets/${petId}/vaccines`),

  getAlerts: (petId: string) => 
    api.get<any, VaccineRecord[]>(`/pets/${petId}/vaccines/alerts`),

  create: (petId: string, data: CreateVaccineParams) => 
    api.post<any, VaccineRecord>(`/pets/${petId}/vaccines`, data),

  update: (petId: string, id: string, data: Partial<CreateVaccineParams>) => 
    api.put<any, VaccineRecord>(`/pets/${petId}/vaccines/${id}`, data),

  delete: (petId: string, id: string) => 
    api.delete(`/pets/${petId}/vaccines/${id}`),
};
