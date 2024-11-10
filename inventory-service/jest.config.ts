import { Config } from 'jest';

const config: Config = {
  testMatch: [
    '**/?(*.)+(spec|test).[jt]s?(x)', 
  ],
  preset: 'ts-jest',  
  testEnvironment: 'node', 
};

export default config;
