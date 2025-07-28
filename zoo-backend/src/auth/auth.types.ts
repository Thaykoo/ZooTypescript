// Types globaux pour l'authentification Auth0
export interface AuthenticatedUser {
  userId: string;
  email?: string;
  name?: string;
  roles: string[];
  [key: string]: any;
}

// Extension de l'objet Request d'Express pour inclure l'utilisateur
declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

// Configuration Auth0
export interface Auth0Config {
  issuerBaseURL: string;
  audience: string;
  clientId?: string;
  clientSecret?: string;
}

// Rôles disponibles dans l'application
export enum UserRole {
  ADMIN = 'admin',
  VETERINAIRE = 'veterinaire', 
  GARDIEN = 'gardien'
}

export type UserRoles = keyof typeof UserRole;
