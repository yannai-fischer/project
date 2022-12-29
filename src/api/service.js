import {Repository} from "./repository.js";

const STANDARD_FIELDS = ['age', 'funding', 'size'];
const MINIMUM_VALUE = 1;

export class Service {

  static async init(){
    await Repository.init();
  }

  static getScoreByCriteria(criteria, value){
    return criteria.filter(threshold => value >= threshold).length ?? MINIMUM_VALUE;
  }

  static async runAlgorithm(company) {
    const weights = await Repository.getAllWeights();
    const criteria = await Repository.getAllCriteria();
    let totalScore = this.getUnweightedUserScoring(company) * weights['userScoring'];
    for (const field of STANDARD_FIELDS) {
      totalScore += await this.getScoreByCriteria(criteria[field], company[field]) * weights[field];
    }
    return +totalScore.toFixed(2);
  }

  static getUnweightedUserScoring(company) {
    return company.userScoring?.length ? company.userScoring.reduce((accumulator, currentValue) => accumulator + currentValue) / company.userScoring.length : MINIMUM_VALUE;
  }

  static async calculateTotalScoreById(id) {
    return await Service.runAlgorithm(await Repository.getCompanyById(id));
  }
}