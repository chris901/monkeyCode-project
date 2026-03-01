import api from './api';

export interface WalkRecord {
  _id: string;
  petId: string;
  startTime: string;
  endTime: string;
  duration: number;
  distance: number;
  trackPoints: {
    lat: number;
    lng: number;
    timestamp: string;
  }[];
  manual: boolean;
  notes?: string;
  createdAt: string;
}

export interface CreateWalkParams {
  startTime: string;
  endTime: string;
  duration: number;
  distance: number;
  trackPoints: {
    lat: number;
    lng: number;
    timestamp: string;
  }[];
  manual: boolean;
  notes?: string;
}

export const walkApi = {
  getAll: (petId: string) => 
    api.get<any, WalkRecord[]>(`/pets/${petId}/walks`),

  create: (petId: string, data: CreateWalkParams) => 
    api.post<any, WalkRecord>(`/pets/${petId}/walks`, data),

  update: (petId: string, id: string, data: Partial<CreateWalkParams>) => 
    api.put<any, WalkRecord>(`/pets/${petId}/walks/${id}`, data),

  delete: (petId: string, id: string) => 
    api.delete(`/pets/${petId}/walks/${id}`),
};
