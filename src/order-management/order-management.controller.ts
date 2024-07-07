import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateOrderDto } from '../common/dto/create-order.dto';
import { OrderManagementService } from './order-management.service';

@Controller('orders')
export class OrderManagementController {
  constructor(
    private readonly orderManagementService: OrderManagementService,
  ) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderManagementService.createOrder(createOrderDto);
  }

  @Get()
  async findAll() {
    return this.orderManagementService.findAllOrders();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.orderManagementService.findOrderById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: Partial<CreateOrderDto>,
  ) {
    return this.orderManagementService.updateOrder(id, updateOrderDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.orderManagementService.removeOrder(id);
  }
}
