import { IsEmail, IsIn, IsISO8601, IsNotEmpty, IsPhoneNumber, IsString, MaxLength, MinLength, ValidateIf } from "class-validator"

const CONTACT_STATUSES = ['lead', 'active', 'inactive'] as const;
const CONTACT_INTERACTION_TYPES = ['call', 'email', 'meeting', 'note'] as const;

export class CreateContactDTO {
  @MaxLength(300)
  @MinLength(3)
  @IsNotEmpty()
  @IsString()
  name: string

  @IsEmail()
  @IsString()
  email: string

  @IsPhoneNumber('BR')
  @IsString()
  phone: string

  @MaxLength(150)
  @MinLength(2)
  @IsString()
  @ValidateIf((_, value) => value !== undefined)
  company?: string

  @IsIn(CONTACT_STATUSES)
  @IsString()
  @ValidateIf((_, value) => value !== undefined)
  status?: string

  @MaxLength(50)
  @MinLength(2)
  @IsNotEmpty()
  @IsString()
  tag: string
}

export class UpdateContactDTO {
  @MaxLength(300)
  @MinLength(3)
  @IsNotEmpty()
  @IsString()
  @ValidateIf((_, value) => value !== undefined)
  name?: string

  @IsEmail()
  @IsString()
  @ValidateIf((_, value) => value !== undefined)
  email?: string

  @IsPhoneNumber('BR')
  @IsString()
  @ValidateIf((_, value) => value !== undefined)
  phone?: string

  @MaxLength(150)
  @MinLength(2)
  @IsString()
  @ValidateIf((_, value) => value !== undefined)
  company?: string

  @IsIn(CONTACT_STATUSES)
  @IsString()
  @ValidateIf((_, value) => value !== undefined)
  status?: string

  @MaxLength(50)
  @MinLength(2)
  @IsNotEmpty()
  @IsString()
  @ValidateIf((_, value) => value !== undefined)
  tag?: string
}

export class CreateContactInteractionDTO {
  @IsIn(CONTACT_INTERACTION_TYPES)
  @IsString()
  type: string

  @MaxLength(1000)
  @MinLength(3)
  @IsNotEmpty()
  @IsString()
  description: string

  @IsISO8601()
  @ValidateIf((_, value) => value !== undefined)
  occurredAt?: string
}
