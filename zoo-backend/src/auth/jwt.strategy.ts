import { Injectable, Logger } from '@nestjs/common';
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

    console.log('🔑 JWT Strategy Configuration:', {
      issuerURL,
      audience,
      jwksUri: `${issuerURL}.well-known/jwks.json`,
    });

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
  }

  async validate(payload: any) {
    // Ajouter manuellement les rôles
    console.log('🔑 Token original payload:', payload);
    
    // Créer un nouvel objet utilisateur avec des rôles forcés
    const user = { 
      userId: payload.sub, 
      roles: ['gardien', 'veterinaire'],  // Ajouter manuellement les rôles ici
      ...payload 
    };
    
    console.log('👤 User with forced roles:', user);
    return user;
  }
}
