import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateOrderDto {
  @IsString()
  @IsOptional()
  customerId?: string;

  @IsArray()
  @IsOptional()
  items?: UpdateOrderItemDto[];

  @IsString()
  @IsOptional()
  vendor?: string;
}

export class UpdateOrderItemDto {
  @IsString()
  productId: string;

  @IsNumber()
  quantity: number;
}
