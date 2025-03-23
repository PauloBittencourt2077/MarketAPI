import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
  ) { }

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

  async updateQuantity(id: string, dto: number) {

    const product = await this.repository.findOneBy({ id });
    if (!product) return null;
    console.log(dto)

    if (dto !== undefined && dto !== null) {
      if (dto > product.quantity) {
        throw new BadRequestException('Quantidade solicitada excede o estoque disponível');
      }
      product.quantity = product.quantity - dto;
    } else {
      // Adicione esta verificação para garantir que a quantidade seja fornecida
      if (dto === undefined || dto === null) {
        throw new BadRequestException('Quantidade não fornecida');
      }
    }

    return this.repository.save(product);

  }
}
