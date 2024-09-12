import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient } from 'mongodb';
const mongod = await MongoMemoryServer.create();
const uri = mongod.getUri();
const client = new MongoClient(uri);


export default client;
