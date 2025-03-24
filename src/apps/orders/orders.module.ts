import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { ProductsModule } from 'src/apps/products/products.module';
import { ProductsController } from 'src/apps/products/products.controller';


@Module({
  imports: [ProductsModule,TypeOrmModule.forFeature([OrderEntity])],
  controllers: [OrdersController, ProductsController],
  providers: [OrdersService],
})
export class OrdersModule {}
