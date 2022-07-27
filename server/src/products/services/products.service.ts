import { CreateProductDto } from '../dtos/create-product.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../schemas/product.schema';
import { UpdateProductDto } from '../dtos/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productsModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<ProductDocument> {
    const product = new this.productsModel(createProductDto);
    return product.save();
  }

  async findAll(): Promise<ProductDocument[]> {
    return this.productsModel.find().exec();
  }

  async findById(id: string): Promise<ProductDocument> {
    const product = await this.productsModel.findById(id).exec();

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return product;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductDocument> {
    const product = await this.productsModel.findByIdAndUpdate(
      id,
      updateProductDto,
    );

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return product;
  }

  async delete(id: string): Promise<void> {
    await this.productsModel.findByIdAndDelete(id);
  }
}
