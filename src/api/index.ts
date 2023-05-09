import { postApi } from './config';
import type { loginType } from '@/types/api.ts';

export const loginApi = (data: loginType) => postApi('/api/user/login', data);
