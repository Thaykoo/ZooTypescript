import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as jwksRsa from 'jwks-rsa';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(readonly configService: ConfigService) {
    const issuerURL = configService.get('AUTH0_ISSUER_BASE_URL');
    const audience = configService.get('AUTH0_AUDIENCE');

    if (!issuerURL || !audience) {
      throw new Error('AUTH0_ISSUER_BASE_URL et AUTH0_AUDIENCE doivent être définis dans les variables d\'environnement');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKeyProvider: jwksRsa.passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${issuerURL}.well-known/jwks.json`,
      }),
      audience,
      issuer: issuerURL,
      algorithms: ['RS256'],
    });

    this.logger.log('Configuration JWT Strategy:', {
      issuerURL,
      audience,
      jwksUri: `${issuerURL}.well-known/jwks.json`,
    });
  }

  async validate(payload: any) {
    if (!payload.sub) {
      throw new UnauthorizedException('Token invalide: subject manquant');
    }

    // Extraire les rôles depuis les custom claims ou metadata d'Auth0
    const roles = payload['https://zoo-app.com/roles'] || 
                  payload.roles || 
                  payload['app_metadata']?.roles || 
                  [];

    this.logger.log('Token validé pour l\'utilisateur:', {
      userId: payload.sub,
      email: payload.email,
      roles: roles,
    });

    return {
      userId: payload.sub,
      email: payload.email,
      name: payload.name,
      roles: roles,
      ...payload
    };
  }
}
