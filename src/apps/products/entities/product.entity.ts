//@ts-nocheck
import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';

import { nanoid } from 'nanoid';

@Entity('products')
export class ProductEntity {
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

  @Column(({ type: 'decimal', precision: 10, scale: 2,nullable: false }))
  price: number

  @BeforeInsert()
  generateId() {
    this.id = `market_${nanoid()}`;
  }

  
  constructor(product?: Partial<ProductEntity>){    
    this.id = product?.id;
    this.name = product?.name;
    this.category = product?.category;
    this.description = product?.description;
    this.price = product?.price;    
  }
}
