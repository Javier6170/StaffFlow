// src/auth/infrastructure/repositories/token-blacklist.repository.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenBlacklistRepository {
  private blacklisted = new Set<string>();

  async add(token: string): Promise<void> {
    this.blacklisted.add(token);
  }

  async contains(token: string): Promise<boolean> {
    return this.blacklisted.has(token);
  }
}
