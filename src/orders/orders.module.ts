import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { ProductsModule } from 'src/products/products.module';
import { ProductsService } from 'src/products/products.service';
import { ProductsController } from 'src/products/products.controller';

@Module({
  imports: [ProductsModule,TypeOrmModule.forFeature([Order])],
  controllers: [OrdersController, ProductsController],
  providers: [OrdersService],
})
export class OrdersModule {}
