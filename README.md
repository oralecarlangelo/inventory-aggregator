# Inventory Aggregator System

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Setup](#setup)
- [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [Testing](#testing)
- [API Endpoints](#api-endpoints)
- [Database Selection](#database-selection)

## Description

This project is an Inventory Aggregator System built with NestJS. It integrates with various order vendors like DoorDash and UberEats via webhooks, processes orders, and updates inventory accordingly. The system uses Prisma for database interactions and supports an in-memory database for testing purposes.

## Features

- Order processing from multiple vendors (DoorDash, UberEats).
- Inventory management and updates.
- Flexible database support with Prisma and in-memory databases.
- Webhook endpoints for receiving orders from vendors.
- Automated testing with Jest and Supertest.

## Setup

### Prerequisites

- Node.js (>= 14.x)
- npm or yarn
- PostgreSQL (if using Prisma)

### Installation

1. Clone the repository:

   ```sh
   git clone https://git@github.com:oralecarlangelo/inventory-aggregator.git
   cd inventory-aggregator
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up environment variables by creating a `.env` file in the root directory:

   ```sh
   touch .env
   ```

4. Add the following environment variables to the `.env` file:

   ```env
   DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>
   USE_PRISMA=true # Set to false to use the in-memory database
   ```

5. Generate Prisma client:

   ```sh
   npx prisma generate
   ```

6. Run Prisma migrations:
   ```sh
   npx prisma migrate dev
   ```

## Running the Application

1. Start the NestJS application:

   ```sh
   npm run start:dev
   ```

2. The application should be running at `http://localhost:3000`.

## Environment Variables

Ensure you have the following environment variables set in your `.env` file:

```env
DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>
USE_PRISMA=true # Set to false to use the in-memory database
```

## Testing

### Unit and Integration Tests

This project uses Jest for unit and integration tests. Supertest is used for testing the HTTP endpoints.

1. Run all tests:

   ```sh
   npm run test
   ```

2. Run tests in watch mode:

   ```sh
   npm run test:watch
   ```

3. Generate test coverage report:
   ```sh
   npm run test:cov
   ```

## API Endpoints

### Webhooks

- **POST /webhook/door-dash**: Receives orders from DoorDash.
- **POST /webhook/uber-eats**: Receives orders from UberEats.

### Orders

- **GET /orders**: Retrieves all orders.
- **GET /orders/:id**: Retrieves a specific order by ID.
- **POST /orders**: Creates a new order.
- **PUT /orders/:id**: Updates an order by ID.
- **DELETE /orders/:id**: Deletes an order by ID.

## Database Selection

The application can switch between using Prisma (PostgreSQL) and an in-memory database for demonstration or testing purposes.

### Using Prisma (PostgreSQL)

By default, the application is set to use Prisma. Ensure `USE_PRISMA` is set to `true` in the `.env` file:

```env
USE_PRISMA=true
```

### Using In-Memory Database

To switch to the in-memory database, set `USE_PRISMA` to `false` in the `.env` file:

```env
USE_PRISMA=false
```

This setup allows for easy switching between a persistent database and an in-memory database, making it flexible for different development and testing needs.
