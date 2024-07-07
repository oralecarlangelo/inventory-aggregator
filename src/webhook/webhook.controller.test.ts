import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { CreateOrderDto } from '../common/dto/create-order.dto';

describe('WebhookController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should handle DoorDash order webhook', async () => {
    const order: CreateOrderDto = {
      id: 'order1',
      customerId: 'customer1',
      items: [
        { productId: 'product1', quantity: 1 },
        { productId: 'product2', quantity: 2 },
      ],
    };

    return request(app.getHttpServer())
      .post('/webhook/door-dash')
      .send(order)
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({ id: 'order1' }),
        );
      });
  });

  it('should handle UberEats order webhook', async () => {
    const order: CreateOrderDto = {
      id: 'order2',
      customerId: 'customer2',
      items: [
        { productId: 'product3', quantity: 1 },
        { productId: 'product4', quantity: 2 },
      ],
    };

    return request(app.getHttpServer())
      .post('/webhook/uber-eats')
      .send(order)
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({ id: 'order2' }),
        );
      });
  });
});
