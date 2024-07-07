import { Test, TestingModule } from '@nestjs/testing';
import { CreateOrderDto } from '../common/dto/create-order.dto';
import { Order } from '../common/interfaces/order.interface';
import { InventoryService } from '../inventory/inventory.service';
import { OrderRepository } from '../repositories/interfaces/order.repository.interface';
import { OrderProcessorService } from './order-processor.service';

describe('OrderProcessorService', () => {
  let service: OrderProcessorService;
  let mockOrderRepository: OrderRepository;
  let mockInventoryService: InventoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderProcessorService,
        {
          provide: 'ORDER_REPOSITORY',
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: InventoryService,
          useValue: {
            updateInventory: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<OrderProcessorService>(OrderProcessorService);
    mockOrderRepository = module.get<OrderRepository>('ORDER_REPOSITORY');
    mockInventoryService = module.get<InventoryService>(InventoryService);
  });

  it('should store order with vendor information', async () => {
    const order: CreateOrderDto = {
      id: 'order1',
      customerId: 'customer1',
      items: [
        { productId: 'product1', quantity: 1 },
        { productId: 'product2', quantity: 2 },
      ],
      vendor: 'DoorDash',
    };

    await service.storeOrder(order);

    expect(mockOrderRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'order1',
        vendor: 'DoorDash',
      }),
    );
  });

  it('should process orders and update inventory', async () => {
    const orders: Order[] = [
      {
        id: 'order1',
        customerId: 'customer1',
        vendor: 'DoorDash',
        items: [
          { productId: 'product1', quantity: 1 },
          { productId: 'product2', quantity: 2 },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    jest.spyOn(mockOrderRepository, 'findAll').mockResolvedValue(orders);

    await service.processOrders();

    expect(mockInventoryService.updateInventory).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'order1',
      }),
    );
  });
});
