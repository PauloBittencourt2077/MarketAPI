import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserDto  {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}