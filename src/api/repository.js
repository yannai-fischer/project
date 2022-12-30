import {MongoMiddleman} from "../utils/mongo-middleman.js";

export class Repository {

  static async init(){
    await MongoMiddleman.init();
  }

  static async getCompanyById(id) {
    return await MongoMiddleman.getCompanyById(id);
  }

  static async getAllWeights() {
    return await MongoMiddleman.getAllWeights();
  }

  static async getAllDefaults() {
    return await MongoMiddleman.getAllDefaults();
  }

  static async getAllCriteria() {
    return await MongoMiddleman.getAllCriteria();
  }

  static async setDefault(updatePayload) {
    return await MongoMiddleman.setDefault(updatePayload);
  }

  static async setCriteria(updatePayload) {
    return await MongoMiddleman.setCriteria(updatePayload);
  }
}