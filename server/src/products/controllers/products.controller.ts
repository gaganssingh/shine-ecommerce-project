import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { ProductDocument } from '../schemas/product.schema';
import { ProductsService } from '../services/products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductDocument> {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAllProducts(): Promise<ProductDocument[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<ProductDocument> {
    return this.productsService.findById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ProductDocument> {
    await this.productsService.update(id, updateProductDto);
    return this.findById(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.productsService.delete(id);
  }
}
