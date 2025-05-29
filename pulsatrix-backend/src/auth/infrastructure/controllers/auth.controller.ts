import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { SignupDto } from '../../application/dto/signup.dto';
import { LoginDto } from '../../application/dto/login.dto';
import { RegisterUseCase } from '../../application/use-cases/register.use-case';
import { LoginUseCase } from '../../application/use-cases/login.use-case';

class AuthResponse<T = any> {
  statusCode: number;
  message: string;
  data?: T;
}

@Controller('api/v1/auth')
export class AuthController {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase
  ) {}

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
}
