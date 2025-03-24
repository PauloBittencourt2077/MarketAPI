import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';

import { nanoid } from 'nanoid';
import { ProductEntity } from '../../products/entities/product.entity';

@Entity('orders')
export class OrderEntity {
  @PrimaryColumn()
  id: string;

  @ManyToMany(() => ProductEntity)
  @JoinTable()
  products: ProductEntity[];

  @Column()
  total_orders: number;

  @Column()
  status: string;

  @BeforeInsert()
  generateId() {
    this.id = `market_${nanoid()}`;
  }
}
