import {Repository} from "./repository.js";
import Lodash from "lodash";
import {CRITERIA_COLLECTION, WEIGHTS_COLLECTION} from "../utils/consts.js";

const STANDARD_FIELDS = ['age', 'funding', 'size'];
const FIELDS_TO_EXCLUDE = ['_id'];
const MINIMUM_VALUE = 1;

const USER_SCORING = 'userScoring';

export class Service {

  static async init(){
    await Repository.init();
  }

  static async getAll(collection){
    return Lodash.omit(await Repository.getAll(collection), FIELDS_TO_EXCLUDE);
  }

  static async setField(updatePayload, collection){
    return await Repository.setField(updatePayload, collection);
  }

  static getScoreByCriteria(criteria, value){
    return criteria.filter(threshold => value >= threshold).length ?? MINIMUM_VALUE;
  }

  static async runAlgorithm(company, weights, criteria) {
    let totalScore = this.getUnweightedUserScoring(company) * weights[USER_SCORING];
    for (const field of STANDARD_FIELDS) {
      totalScore += this.getScoreByCriteria(criteria[field], company[field]) * weights[field];
    }
    return +totalScore.toFixed(2);
  }

  static getUnweightedUserScoring(company) {
    return company.userScoring?.length ? company.userScoring.reduce((accumulator, currentValue) => accumulator + currentValue) / company.userScoring.length : MINIMUM_VALUE;
  }

  static async calculateTotalScoreById(id, collection) {
    const weights = await Repository.getAll(WEIGHTS_COLLECTION);
    const criteria = await Repository.getAll(CRITERIA_COLLECTION);
    return await Service.runAlgorithm(await Repository.getCompanyById(id, collection), weights, criteria);
  }
}