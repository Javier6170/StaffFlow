import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { RegisterUseCase } from './application/use-cases/register.use-case';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { UserSchema } from './infrastructure/schemas/user.schema';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TokenBlacklistRepository } from './infrastructure/repositories/token-blacklist.repository';
import { LogoutUseCase } from './application/use-cases/logout.use-case';
import { JwtAuthGuard } from './infrastructure/guards/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: config.get<string>('JWT_EXPIRES_IN') || '1h',
        },
      }),
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [
    RegisterUseCase,
    LoginUseCase,
    TokenBlacklistRepository,
    LogoutUseCase,
    UserRepository,
    JwtStrategy,
    JwtAuthGuard
  ],
  exports: [JwtStrategy, JwtAuthGuard, TokenBlacklistRepository]
})
export class AuthModule {}
