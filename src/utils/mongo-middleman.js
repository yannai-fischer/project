import {MongoClient, ObjectId} from 'mongodb';

const CONNECTION_STRING = 'mongodb+srv://kingyannai:G8%23Py%24fk3TZJ9SV@project-cluster.biehl8x.mongodb.net/test';
const DB = 'project';

export class MongoMiddleman {
  static mongoClient;

  static async init() {
    MongoMiddleman.mongoClient = new MongoClient(CONNECTION_STRING);
    await MongoMiddleman.mongoClient.connect();
  }

  static async getById(id, collection) {
    return await MongoMiddleman.mongoClient.db(DB).collection(collection).findOne({_id: ObjectId(id)});
  }

  static async getFullDocument(collection) {
    return await MongoMiddleman.mongoClient.db(DB).collection(collection).findOne({});
  }

  static async setField(updatePayload, collection) {
    return await MongoMiddleman.mongoClient.db(DB).collection(collection).updateOne({}, {$set: updatePayload});
  }

  static async getAllDocumentsInCollection(collection, options) {
    return await MongoMiddleman.mongoClient.db(DB).collection(collection).find().project(options).toArray();
  }
}
