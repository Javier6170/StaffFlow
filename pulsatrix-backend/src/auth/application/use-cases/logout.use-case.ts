import { Injectable } from '@nestjs/common';
import { TokenBlacklistRepository } from 'src/auth/infrastructure/repositories/token-blacklist.repository';

@Injectable()
export class LogoutUseCase {
  constructor(private readonly blacklist: TokenBlacklistRepository) {}

  async execute(token: string): Promise<void> {
    // Añade el JWT a la blacklist
    await this.blacklist.add(token);
  }
}
