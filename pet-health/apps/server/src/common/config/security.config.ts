import { helmet } from 'helmet';
import { rateLimit } from 'express-rate-limit';

export const securityConfig = {
  helmet: helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  }),
  rateLimit: rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: '请求过于频繁，请稍后再试',
  }),
};
