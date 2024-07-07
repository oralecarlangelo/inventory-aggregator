import { Test, TestingModule } from '@nestjs/testing';
import { CreateOrderDto } from '../common/dto/create-order.dto';
import { Order } from '../common/interfaces/order.interface';
import { OrderRepository } from '../repositories/interfaces/order.repository.interface';
import { OrderManagementService } from './order-management.service';

describe('OrderManagementService', () => {
  let service: OrderManagementService;
  let mockOrderRepository: OrderRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderManagementService,
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
      ],
    }).compile();

    service = module.get<OrderManagementService>(OrderManagementService);
    mockOrderRepository = module.get<OrderRepository>('ORDER_REPOSITORY');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an order', async () => {
    const createOrderDto: CreateOrderDto = {
      id: '1',
      customerId: 'customer1',
      items: [{ productId: 'product1', quantity: 2 }],
      vendor: 'vendor1',
    };
    const order: Order = {
      ...createOrderDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(mockOrderRepository, 'create').mockResolvedValue(order);
    expect(await service.createOrder(createOrderDto)).toEqual(order);
    expect(mockOrderRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        ...createOrderDto,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      }),
    );
  });

  it('should find all orders', async () => {
    const orders: Order[] = [
      {
        id: '1',
        customerId: 'customer1',
        items: [{ productId: 'product1', quantity: 2 }],
        vendor: 'vendor1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    jest.spyOn(mockOrderRepository, 'findAll').mockResolvedValue(orders);
    expect(await service.findAllOrders()).toEqual(orders);
    expect(mockOrderRepository.findAll).toHaveBeenCalled();
  });

  it('should find an order by id', async () => {
    const order: Order = {
      id: '1',
      customerId: 'customer1',
      items: [{ productId: 'product1', quantity: 2 }],
      vendor: 'vendor1',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(mockOrderRepository, 'findOne').mockResolvedValue(order);
    expect(await service.findOrderById('1')).toEqual(order);
    expect(mockOrderRepository.findOne).toHaveBeenCalledWith('1');
  });

  it('should update an order', async () => {
    const updateOrderDto: Partial<CreateOrderDto> = {
      customerId: 'customer2',
    };
    const updatedOrder: Order = {
      id: '1',
      customerId: 'customer2',
      items: [{ productId: 'product1', quantity: 2 }],
      vendor: 'vendor1',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(mockOrderRepository, 'update').mockResolvedValue(updatedOrder);
    expect(await service.updateOrder('1', updateOrderDto)).toEqual(
      updatedOrder,
    );
    expect(mockOrderRepository.update).toHaveBeenCalledWith(
      '1',
      expect.objectContaining({
        ...updateOrderDto,
        updatedAt: expect.any(Date),
      }),
    );
  });

  it('should remove an order', async () => {
    jest.spyOn(mockOrderRepository, 'remove').mockResolvedValue(undefined);
    await service.removeOrder('1');
    expect(mockOrderRepository.remove).toHaveBeenCalledWith('1');
  });
});
