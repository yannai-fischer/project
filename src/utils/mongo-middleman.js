import {MongoClient, ObjectId, ObjectID} from 'mongodb';

const CONNECTION_STRING = 'mongodb+srv://kingyannai:G8%23Py%24fk3TZJ9SV@project-cluster.biehl8x.mongodb.net/test'

export class MongoMiddleman {
  static mongoClient;

  static async init() {
    MongoMiddleman.mongoClient = new MongoClient(CONNECTION_STRING);
    await MongoMiddleman.mongoClient.connect();
  }

  static async getCompanyById(id) {
    return await MongoMiddleman.mongoClient.db('project').collection('companies').findOne({_id:ObjectId(id)});
  }

  static async getWeights() {
    return await MongoMiddleman.mongoClient.db('project').collection('weights').findOne();
  }

  static async getCriteria() {
    return await MongoMiddleman.mongoClient.db('project').collection('criteria').findOne();
  }
}