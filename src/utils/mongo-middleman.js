import {MongoClient, ObjectId} from 'mongodb';

const CONNECTION_STRING = 'mongodb+srv://kingyannai:G8%23Py%24fk3TZJ9SV@project-cluster.biehl8x.mongodb.net/test';

export class MongoMiddleman {
  static mongoClient;

  static async init() {
    MongoMiddleman.mongoClient = new MongoClient(CONNECTION_STRING);
    await MongoMiddleman.mongoClient.connect();
  }

  static async getCompanyById(id) {
    return await MongoMiddleman.mongoClient.db('project').collection('companies').findOne({_id: ObjectId(id)});
  }

  static async getAllWeights() {
    return await MongoMiddleman.mongoClient.db('project').collection('weights').findOne();
  }

  static async getAllDefaults() {
    return await MongoMiddleman.mongoClient.db('project').collection('defaults').findOne();
  }

  static async getAllCriteria() {
    return await MongoMiddleman.mongoClient.db('project').collection('criteria').findOne();
  }

  static async setDefault(updatePayload) {
    return await MongoMiddleman.mongoClient.db('project').collection('defaults').updateOne({}, {$set: updatePayload});
  }

  static async setCriteria(updatePayload) {
    return await MongoMiddleman.mongoClient.db('project').collection('criteria').updateOne({}, {$set: updatePayload});
  }
}