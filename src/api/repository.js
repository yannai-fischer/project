import {MongoMiddleman} from "../utils/mongo-middleman.js";

export class Repository {

  static async init(){
    await MongoMiddleman.init();
  }

  static async getCompanyById(id, collection) {
    return await MongoMiddleman.getById(id, collection);
  }

  static async getAll(collection) {
    return await MongoMiddleman.getAll(collection);
  }

  static async setField(updatePayload, collection) {
    return await MongoMiddleman.setField(updatePayload, collection);
  }
}