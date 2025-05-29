import { Controller, Post, Body, HttpStatus, HttpCode, UseGuards, Req } from '@nestjs/common';
import { SignupDto } from '../../application/dto/signup.dto';
import { LoginDto } from '../../application/dto/login.dto';
import { RegisterUseCase } from '../../application/use-cases/register.use-case';
import { LoginUseCase } from '../../application/use-cases/login.use-case';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { LogoutUseCase } from 'src/auth/application/use-cases/logout.use-case';

class AuthResponse<T = any> {
  statusCode: number;
  message: string;
  data?: T;
}

@Controller('api/v1/auth')
export class AuthController {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly logoutUseCase: LogoutUseCase
  ) { }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: SignupDto): Promise<AuthResponse<{ accessToken: string }>> {
    const { accessToken } = await this.registerUseCase.execute(dto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Usuario registrado con éxito',
      data: { accessToken },
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() dto: LoginDto,
  ): Promise<AuthResponse<{ accessToken: string }>> {
    const { access_token } = await this.loginUseCase.execute(dto);

    return {
      statusCode: HttpStatus.OK,
      message: 'Inicio de sesión exitoso',
      data: { accessToken: access_token },
    };
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@Req() req) {
    const authHeader = req.headers.authorization as string;
    const token = authHeader.replace(/^Bearer\s+/, '');
    await this.logoutUseCase.execute(token);
  }
}
