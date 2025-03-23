import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';

import { nanoid } from 'nanoid';

@Entity('products')
export class Product {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column()
  description: string;

  @Column()
  quantity: number

  @Column()
  price: number

  @BeforeInsert()
  generateId() {
    this.id = `market_${nanoid()}`;
  }
}
