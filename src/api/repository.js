import {MongoMiddleman} from "../utils/mongo-middleman.js";

export class Repository {

  static async init(){
    await MongoMiddleman.init();
  }

  static async getCompanyById(id) {
    return await MongoMiddleman.getCompanyById(id);
  }

  static async getAllWeights() {
    return await MongoMiddleman.getWeights();
  }

  static async getAllCriteria() {
    return await MongoMiddleman.getCriteria();
  }
}