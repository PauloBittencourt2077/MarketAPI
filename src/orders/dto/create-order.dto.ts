import { IsArray, IsEnum, isEnum, IsNumber, IsString } from "class-validator";
import { Product } from "src/products/entities/product.entity";

enum orderStatus {
    'Concluído',
    'Pendente',
    'Cancelado'
}

export class CreateOrderDto {
    @IsArray()
    products: Product[];

    @IsNumber()
    total_orders: number;

    @IsEnum(orderStatus)
    status: string;

}
