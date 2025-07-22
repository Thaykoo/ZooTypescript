import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => {
  console.log(`🏷️ Décorateur: Rôles définis:`, roles);
  return SetMetadata(ROLES_KEY, roles);
};