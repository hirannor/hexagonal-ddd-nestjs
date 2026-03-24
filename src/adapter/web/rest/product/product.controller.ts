import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ProductModel } from './product.model';
import {
  PRODUCT_CREATE_USE_CASE,
  PRODUCT_QUERY_USE_CASE,
} from '@application/tokens/service.tokens';
import { ProductDisplaying } from '@application/usecases/product-displaying';
import { Product } from '@domain/product';
import { toCommand, toModel } from './product.mapper';
import { CreateProduct } from '@domain/product/create-product';
import { ProductCreating } from '@application/usecases/product-creating';

@Controller('products')
export class ProductController {
  constructor(
    @Inject(PRODUCT_QUERY_USE_CASE)
    private readonly products: ProductDisplaying,

    @Inject(PRODUCT_CREATE_USE_CASE)
    private readonly productCreation: ProductCreating,
  ) {}

  @Get()
  async displayAll(): Promise<ProductModel[]> {
    const products: Product[] = await this.products.displayAll();

    return products.map((value): ProductModel => toModel(value));
  }

  @Post()
  async create(@Body() model: ProductModel): Promise<ProductModel> {
    const command: CreateProduct = toCommand(model);
    const product: Product = await this.productCreation.create(command);

    return toModel(product);
  }

  @Get(':id')
  async displayById(@Param('id') id: string): Promise<ProductModel> {
    const product: Product = await this.products.displayById(id);
    return toModel(product);
  }
}
