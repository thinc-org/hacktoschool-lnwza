import { Controller, Get} from '@nestjs/common';
import { Req, Res } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async validate(@Req() req) {
    const ticket=req.headers['ticket'];
    if (ticket) {
        try {
            const token = await this.authService.validate(ticket);
            return { custom_token: token };
        } catch {
            throw new HttpException('User not found!', HttpStatus.BAD_REQUEST);
        }
    } else {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/login')
  login(@Res() res) {
    res.status(302);
    res.redirect('https://sso.thinc.in.th/html/login.html?service=http://localhost:3000/api/login');
  }
}
