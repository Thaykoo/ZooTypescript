import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      throw err || new UnauthorizedException('Token JWT invalide ou manquant');
    }
    return user;
  }
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('Utilisateur non authentifié');
    }

    if (!user.roles || !Array.isArray(user.roles)) {
      throw new UnauthorizedException('Rôles utilisateur non définis');
    }

    const hasRole = requiredRoles.some((role) => user.roles.includes(role));
    
    if (!hasRole) {
      throw new UnauthorizedException(`Accès refusé. Rôles requis: ${requiredRoles.join(', ')}`);
    }

    return true;
  }
}