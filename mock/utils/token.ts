import jwt from 'jsonwebtoken';
import { config } from './config.ts';
// import TOKEN_ENCODE_STR = require('config.ts');

export const create_token = (str: string) => {
  return jwt.sign({ str }, config.TOKEN_ENCODE_STR, { expiresIn: '1h' });
};
