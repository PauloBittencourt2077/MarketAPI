import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/apps/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async signIn(
    email: string,
  ): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new NotFoundException();
    }
    const payload = { username: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}