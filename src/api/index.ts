import { http } from './config';
import type { loginType, registerType, getMenuType } from '@/types/api';

export const loginApi = (data: loginType) => http.post('/api/user/login', data);

export const registerApi = (data: registerType) => http.post('/api/user/register', data);

export const getCodeApi = () => http.get('/api/other/getCode');

export const getMenuApi = (data: getMenuType) => http.post('/api/user/getMenu', data);
