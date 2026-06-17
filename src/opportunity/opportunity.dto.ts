import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min, MinLength } from 'class-validator';

const OPPORTUNITY_STATUSES = ['open', 'won', 'lost'] as const;

export class CreateOpportunityDTO {
  @MaxLength(150)
  @MinLength(3)
  @IsNotEmpty()
  @IsString()
  title: string;

  @MaxLength(1000)
  @IsOptional()
  @IsString()
  description?: string;

  @MaxLength(80)
  @MinLength(2)
  @IsNotEmpty()
  @IsString()
  pipelineStage: string;

  @Min(0)
  @IsNumber()
  estimatedValue: number;

  @IsIn(OPPORTUNITY_STATUSES)
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsString()
  contactId: string;
}

export class UpdateOpportunityDTO {
  @MaxLength(150)
  @MinLength(3)
  @IsOptional()
  @IsString()
  title?: string;

  @MaxLength(1000)
  @IsOptional()
  @IsString()
  description?: string;

  @MaxLength(80)
  @MinLength(2)
  @IsOptional()
  @IsString()
  pipelineStage?: string;

  @Min(0)
  @IsOptional()
  @IsNumber()
  estimatedValue?: number;

  @IsIn(OPPORTUNITY_STATUSES)
  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  contactId?: string;
}
