import {Repository} from "./repository.js";
import {COMPANIES_COLLECTION, CRITERIA_COLLECTION, WEIGHTS_COLLECTION} from "../utils/consts.js";

const STANDARD_FIELDS = ['age', 'funding', 'size'];
const MINIMUM_VALUE = 1;
const USER_SCORE = 'userScore';

export class Service {

  static async init() {
    await Repository.init();
  }

  static async getAll(collection) {
    return await Repository.getAll(collection);
  }

  static async setField(updatePayload, collection) {
    return await Repository.setField(updatePayload, collection);
  }

  static getScoreByCriteria(criteria, value) {
    return criteria.filter(threshold => value >= threshold).length ?? MINIMUM_VALUE;
  }

  static async runAlgorithm(company, weights, criteria) {
    let totalScore = this.getUnweightedUserScore(company) * weights[USER_SCORE];
    for (const field of STANDARD_FIELDS) {
      totalScore += this.getScoreByCriteria(criteria[field], company[field]) * weights[field];
    }
    return +totalScore.toFixed(2);
  }

  static getUnweightedUserScore(company) {
    return company.userScore?.length ? company.userScore.reduce((accumulator, currentValue) => accumulator + currentValue) / company.userScore.length : MINIMUM_VALUE;
  }

  static async calculateTotalScoreById(id, collection) {
    const weights = await Repository.getAll(WEIGHTS_COLLECTION);
    const criteria = await Repository.getAll(CRITERIA_COLLECTION);
    return await Service.runAlgorithm(await Repository.getCompanyById(id, collection), weights, criteria);
  }

  static async getCompanyBusinessCards() {
    return await Repository.getAllDocumentsInCollection(COMPANIES_COLLECTION, {name: 1});
  }
}
