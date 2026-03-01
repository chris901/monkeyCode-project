import api from './api';

export interface Pet {
  _id: string;
  userId: string;
  name: string;
  type: 'dog' | 'cat' | 'other';
  breed?: string;
  gender?: 'male' | 'female';
  birthDate?: string;
  weight?: number;
  avatar?: string;
  chipId?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePetParams {
  name: string;
  type: 'dog' | 'cat' | 'other';
  breed?: string;
  gender?: 'male' | 'female';
  birthDate?: string;
  weight?: number;
  avatar?: string;
  chipId?: string;
  notes?: string;
}

export interface UpdatePetParams extends Partial<CreatePetParams> {}

export const petsApi = {
  getAll: () => api.get<any, Pet[]>('/pets'),

  getById: (id: string) => api.get<any, Pet>(`/pets/${id}`),

  create: (data: CreatePetParams) => api.post<any, Pet>('/pets', data),

  update: (id: string, data: UpdatePetParams) => 
    api.put<any, Pet>(`/pets/${id}`, data),

  delete: (id: string) => api.delete(`/pets/${id}`),
};
