
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('Products')
export class ProductsController {
  constructor(private readonly ProductsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.ProductsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.ProductsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const Product = await this.ProductsService.findOne(id);
    if (!Product) throw new NotFoundException();
    return Product;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const Product = await this.ProductsService.update(
      id,
      updateProductDto,
    );
    if (!Product) throw new NotFoundException();
    return Product;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    const Product = await this.ProductsService.remove(id);
    if (!Product) throw new NotFoundException();
  }

  @Patch(':id')
  async updateQuantity(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const Product = await this.ProductsService.update(
      id,
      updateProductDto,
    );
    if (!Product) throw new NotFoundException();
    return Product;
  }
}
