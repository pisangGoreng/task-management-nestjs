import { Body, Controller, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth.credentials.dto';

@Controller('auth')
export class AuthController {
  // dependency injection
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    // ! ValidationPipe will validate the body with rules from authCredentialsDto
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto
    ): Promise<void>{
    return this.authService.signUp(authCredentialsDto)
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto
    ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto)
  }

}
