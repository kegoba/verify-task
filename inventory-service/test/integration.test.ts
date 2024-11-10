import { Connection } from 'amqplib';
import supertest from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from "../src/app"; 
import { InventoryProps } from '../src/types';


import { create_inventory,
  one_inventory,
  update_inventory_by_id, } from "../src/crud/inventory"

let mongoServer: MongoMemoryServer;
const newItem = { product_name: 'Test Product', stockLevel: 100, price: 20 } as InventoryProps;
jest.setTimeout(30000)



beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
},30000);

afterAll(async () => {
  await mongoose.connection.dropDatabase(); 
  await mongoose.disconnect(); 
  await mongoServer.stop(); 
  jest.clearAllMocks();
});


jest.mock('amqplib', () => {
  return {
    connect: jest.fn().mockResolvedValue({
      createChannel: jest.fn().mockResolvedValue({
        assertQueue: jest.fn(),
        consume: jest.fn(),
        sendToQueue: jest.fn(),
        close: jest.fn(),
      }),
      createConfirmChannel: jest.fn(),
      close: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn(),
      on: jest.fn(),
      once: jest.fn(),
    } as unknown as Connection),
  };
});







describe('Inventory Controller', () => {
  it('should add a new stock item', async () => {
    const response = await supertest(app)
      .post('/api/v1/inventory/stock')
      .send(newItem)
      .expect(201); 

    expect(response.body.status).toBe('successful');
    expect(response.body.message).toBe('Created Successfully');
    expect(response.body.data.product_name).toBe(newItem.product_name);
    expect(response.body.data.stockLevel).toBe(newItem.stockLevel);
    expect(response.body.data.price).toBe(newItem.price);
  });


  it('should get all inventory items', async () => {
    await create_inventory(newItem);

    const response = await supertest(app)
      .get('/api/v1/inventory/all-stock')
      .query({ page: 1, limit: 10 })
      .expect(200); // Ensures the status is 200

    expect(response.body.status).toBe('successful');
    expect(Array.isArray(response.body.data.products)).toBe(true);
    expect(response.body.data.products.length).toBeGreaterThanOrEqual(1);
  });

  // Test for getting one inventory item by ID
  it('should get a single inventory item', async () => {
    // Create a new inventory item
    const createdItemResponse = await supertest(app)
      .post('/api/v1/inventory/stock')
      .send(newItem)
      .expect(201);

    const createdItemId = createdItemResponse.body.data._id;

    const response = await supertest(app)
      .get(`/api/v1/inventory/stock/${createdItemId}`)
      .expect(200);

    expect(response.body.status).toBe('successful');
    expect(response.body.data._id).toBe(createdItemId);
    expect(response.body.data.product_name).toBe(newItem.product_name);
    expect(response.body.data.stockLevel).toBe(newItem.stockLevel);
    expect(response.body.data.price).toBe(newItem.price);
  });

  // Test for updating an inventory item
  it('should update an inventory item', async () => {
    const createdItemResponse = await supertest(app)
      .post('/api/v1/inventory/stock')
      .send(newItem)
      .expect(201);

    const createdItemId = createdItemResponse.body.data._id;

    const updatedItem = {
      product_name: 'Updated Product',
      stockLevel: 150,
      price: 25,
    };

    const response = await supertest(app)
      .put(`/api/v1/inventory/stock/${createdItemId}`)
      .send(updatedItem)
      .expect(200);

    expect(response.body.status).toBe('successful');
    expect(response.body.data.product_name).toBe(updatedItem.product_name);
    expect(response.body.data.stockLevel).toBe(updatedItem.stockLevel);
    expect(response.body.data.price).toBe(updatedItem.price);
  });
});
