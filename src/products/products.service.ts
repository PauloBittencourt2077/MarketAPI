import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
  ) {}

  create(dto: CreateProductDto) {
    const Product = this.repository.create(dto);
    return this.repository.save(Product);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findOneBy({ id });
  }

  async update(id: string, dto: UpdateProductDto) {
    const Product = await this.repository.findOneBy({ id });
    if (!Product) return null;
    this.repository.merge(Product, dto);
    return this.repository.save(Product);
  }

  async remove(id: string) {
    const Product = await this.repository.findOneBy({ id });
    if (!Product) return null;
    return this.repository.remove(Product);
  }
}
