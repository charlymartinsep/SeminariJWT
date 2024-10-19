import { PIUser } from '../modelos/types_d_users';

declare global {
  namespace Express {
      interface Request {
          user?: PIUser; // Aquí defines que Request tendrá un campo 'user'
      }
  }
}