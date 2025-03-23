import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsService } from 'src/products/products.service';


@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly repository: Repository<Order>,
    private readonly productsService: ProductsService

  ) { }
 async create(dto: CreateOrderDto) {
    const order = this.repository.create(dto);
    console.log('Teste service',dto)
    if(dto.status === 'Concluído'){
      await this.productsService.updateQuantity(dto.products[0].id, dto.total_orders);
    }
    return this.repository.save(order);
  }

  findAll() {
    return this.repository.find();
  }

}
