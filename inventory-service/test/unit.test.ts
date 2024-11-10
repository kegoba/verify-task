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

let data = {
    product_name : "laptop",
    price : 5000,
    stockLevel : 200
}


describe('Inventory Service - Integration Tests', () => {
  it('should create and retrieve an inventory item', async () => {
    const newItem = { product_name: data.product_name, stockLevel:data.stockLevel, price: data.price} as InventoryProps;
    const createdItem = await create_inventory(newItem);


    const foundItem = await one_inventory(createdItem._id);
    expect(foundItem).toHaveProperty('_id');
    expect(foundItem?.product_name).toBe(data.product_name);
    expect(foundItem?.stockLevel).toBe(data.stockLevel);
  });

  it('should update stock level across the database', async () => {
    const newItem = {  product_name: data.product_name, stockLevel:data.stockLevel, price: data.price} as InventoryProps;
    const createdItem = await create_inventory(newItem);
    
    await update_inventory_by_id(createdItem._id, {stockLevel:data.stockLevel} as InventoryProps );

    const updatedItem = await one_inventory (createdItem._id);
    expect(updatedItem?.stockLevel).toBe(data.stockLevel);
  });
});
 