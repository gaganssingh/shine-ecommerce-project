import { PartialType } from '@nestjs/mapped-types';
import { IsString, MinLength, IsNumber } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsString()
  @MinLength(2, {
    message: `Name must be atleast 2 characters`,
  })
  name?: string;

  @IsNumber()
  price?: number;

  @IsString()
  @MinLength(6, {
    message: `Description must be atleast 6 characters`,
  })
  description?: string;
}
