import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @MaxLength(120)
  name?: string;

  @IsEmail()
  @IsOptional()
  @MaxLength(180)
  email?: string;
}
