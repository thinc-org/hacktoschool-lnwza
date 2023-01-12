import { Controller, Get} from '@nestjs/common';
import { Query, Res } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { AuthService } from './auth.service';
import { getAuth, signInWithCustomToken } from 'firebase/auth'


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async validate(@Query('ticket') query: string, @Res({passthrough: true}) res) {
    if (query) {
        try {
            const token = await this.authService.validate(query);
            const auth = getAuth();
            await signInWithCustomToken(auth, token).then(userCredential => {
                console.log(userCredential.user.uid);
            }).catch(error => {
                const errorCode=error.code;
                const errorMessage=error.message;
            })
            res.cookie('access-token', token, {
                httpOnly: true, 
                expires: new Date(Date.now()+60*60*1000)
            });
            res.status(200);
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
    res.redirect('https://sso.thinc.in.th/html/login.html?service=http://localhost:3000/auth/');
  }
}
