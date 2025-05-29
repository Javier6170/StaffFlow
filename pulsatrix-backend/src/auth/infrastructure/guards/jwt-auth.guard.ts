import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TokenBlacklistRepository } from '../repositories/token-blacklist.repository';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly blacklist: TokenBlacklistRepository) {
    super();
  }

  async canActivate(context) {
    // Primero deja que Passport valide la firma
    const activated = (await super.canActivate(context)) as boolean;
    if (!activated) return false;

    // Luego chequea la blacklist
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization as string || '';
    const token = authHeader.replace(/^Bearer\s+/, '');
    const isBlack = await this.blacklist.contains(token);
    if (isBlack) {
      throw new UnauthorizedException('Token revocado');
    }
    return true;
  }
}