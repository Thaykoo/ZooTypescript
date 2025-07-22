import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class DevAuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Simuler un utilisateur authentifié pour le développement
    req['user'] = {
      id: 1,
      username: 'dev_user',
      roles: ['gardien', 'veterinaire'],
    };
    next();
  }
}