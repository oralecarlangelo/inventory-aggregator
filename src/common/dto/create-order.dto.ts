import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  id: string;

  @IsString()
  customerId: string;

  @IsArray()
  items: CreateOrderItemDto[];

  @IsString()
  @IsOptional()
  vendor?: string;
}

export class CreateOrderItemDto {
  @IsString()
  productId: string;

  @IsNumber()
  quantity: number;
}
