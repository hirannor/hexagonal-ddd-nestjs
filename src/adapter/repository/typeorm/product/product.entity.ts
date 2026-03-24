import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn({ name: 'ID' }) public id: number;

  @Column({ name: 'PRODUCT_ID', type: 'uuid', unique: true })
  public productId: string;

  @Column({ name: 'NAME' }) public name: string;
}
