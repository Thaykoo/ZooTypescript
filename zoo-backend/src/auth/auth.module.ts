import { Module } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { RolesGuard } from './roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        () => ({
          AUTH0_ISSUER_BASE_URL: 'https://dev-rkbeore70k0guhoo.us.auth0.com/',
          AUTH0_AUDIENCE: 'http://localhost:3000',
        }),
      ],
    }),
  ],
  providers: [JwtStrategy, RolesGuard],
  exports: [RolesGuard],
})
export class AuthModule {}
