import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class SignUpDTO {
  @MaxLength(300)
  @MinLength(3)
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  @IsString()
  email: string;

  @MaxLength(30)
  @MinLength(6)
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class SignInDTO {
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export type JwtPayload = {
  id: string
}