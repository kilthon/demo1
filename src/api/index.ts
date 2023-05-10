import { http } from './config';
import type { loginType } from '@/types/type.ts';

export const loginApi = (data: loginType) => http.post('/api/user/login', data);
