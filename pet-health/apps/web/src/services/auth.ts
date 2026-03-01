import api from './api';

export interface LoginParams {
  phone: string;
  password: string;
}

export interface RegisterParams {
  phone: string;
  password: string;
  nickname?: string;
}

export interface User {
  _id: string;
  phone: string;
  nickname: string;
  avatar?: string;
  loginType: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export const authApi = {
  register: (params: RegisterParams) => 
    api.post<any, AuthResponse>('/auth/register', params),

  login: (params: LoginParams) => 
    api.post<any, AuthResponse>('/auth/login', params),

  loginByPhone: (params: { phone: string; code: string }) => 
    api.post<any, AuthResponse>('/auth/login/phone', params),

  sendSmsCode: (phone: string) => 
    api.post('/auth/sms/send', { phone }),

  getProfile: () => 
    api.get<any, User>('/auth/profile'),

  updateProfile: (data: { nickname?: string; avatar?: string }) => 
    api.put<any, User>('/auth/profile', data),
};
