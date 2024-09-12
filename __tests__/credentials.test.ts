// src/app.test.ts
import { describe, beforeAll, afterAll, it, expect } from 'vitest';
import mongo from '../src/mongo';
import { MongoMemoryServer } from 'mongodb-memory-server';

import app from '../src/app';

describe('Integration Test for /credentials', () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongo.connect();
  });

  afterAll(async () => {
    await mongo.close();
    await mongoServer.stop();
  });

  it('should create credentials and return status 201', async () => {
    const response = await app.request('/credentials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'testuser',
        password: 'testpass',
      }),
    });

    const body = await response.json();
    expect(response.status).toBe(201);
    expect(body).toEqual({ status: 'success' });

    const credentials = await mongo.db().collection('credentials').findOne({ username: 'testuser' });
    expect(credentials).toBeTruthy();
    expect(credentials?.username).toBe('testuser');
  });
});
