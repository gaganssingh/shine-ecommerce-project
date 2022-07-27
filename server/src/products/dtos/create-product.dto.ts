import { IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(2, {
    message: `name must be atleast 2 characters`,
  })
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  @MinLength(6, {
    message: `description must be atleast 6 characters`,
  })
  @IsOptional()
  description: string;
}
