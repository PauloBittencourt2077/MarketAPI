import { IsArray, IsEnum, isEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ProductEntity } from "src/apps/products/entities/product.entity";

enum orderStatus {
    'Concluído',
    'Pendente',
    'Cancelado'
}

export class CreateOrderDto {
    @IsNotEmpty()
    @IsArray()
    products: ProductEntity[];

    @IsNotEmpty()
    @IsNumber()
    total_orders: number;

    @IsNotEmpty()
    @IsEnum(orderStatus)
    status: string;

}
