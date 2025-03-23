import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';

import { nanoid } from 'nanoid';
import { Product } from 'src/products/entities/product.entity';

@Entity('orders')
export class Order {
  @PrimaryColumn()
  id: string;

  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[];

  @Column()
  total_orders: number;

  @Column()
  status: string;

  @BeforeInsert()
  generateId() {
    this.id = `market_${nanoid()}`;
  }
}
