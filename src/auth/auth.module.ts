import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/apps/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [ UsersModule,
    JwtModule.register({
      global: true,
      secret: 'ovo',
      signOptions: { expiresIn: '1h' },
    }),],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
