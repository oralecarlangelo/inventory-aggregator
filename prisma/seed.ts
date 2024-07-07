import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed Customers
  const customer1 = await prisma.customer.create({
    data: {
      id: 'customer1',
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
  });

  const customer2 = await prisma.customer.create({
    data: {
      id: 'customer2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
    },
  });

  // Seed Inventory
  const product1 = await prisma.inventory.create({
    data: {
      productId: 'product1',
      name: 'Product 1',
      quantity: 100,
    },
  });

  const product2 = await prisma.inventory.create({
    data: {
      productId: 'product2',
      name: 'Product 2',
      quantity: 200,
    },
  });

  const product3 = await prisma.inventory.create({
    data: {
      productId: 'product3',
      name: 'Product 3',
      quantity: 150,
    },
  });

  const product4 = await prisma.inventory.create({
    data: {
      productId: 'product4',
      name: 'Product 4',
      quantity: 250,
    },
  });

  // Seed Orders
  await prisma.order.create({
    data: {
      id: 'order1',
      customerId: customer1.id,
      vendor: 'DoorDash',
      items: {
        create: [
          { productId: product1.productId, quantity: 1 },
          { productId: product2.productId, quantity: 2 },
        ],
      },
    },
  });

  await prisma.order.create({
    data: {
      id: 'order2',
      customerId: customer2.id,
      vendor: 'UberEats',
      items: {
        create: [
          { productId: product3.productId, quantity: 1 },
          { productId: product4.productId, quantity: 2 },
        ],
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
