import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class FakeAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    console.log('🔓 FakeAuthGuard: Authentification factice - TOUJOURS AUTORISÉ');
    return true;
  }
}

@Injectable()
export class FakeRolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    
    console.log(`🔓 FakeRolesGuard: Rôle requis "${requiredRoles?.[0] || 'aucun'}" - TOUJOURS AUTORISÉ`);
    return true;
  }
}