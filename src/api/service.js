import {Repository} from "./repository.js";

const STANDARD_FIELDS = ['age', 'funding', 'size'];
const MINIMUM_VALUE = 1;

export class Service {

  static getScoreByCriteria(criteria, value){
    return criteria.filter(threshold => value >= threshold).length ?? MINIMUM_VALUE;
  }

  static runAlgorithm(company) {
    const weights = Repository.getAllWeights();
    let totalScore = this.calculateUserScoring(company, weights);
    STANDARD_FIELDS.forEach(field => totalScore += this.getWeightedScore(field, company, weights));
    return +totalScore.toFixed(2);
  }

  static getWeightedScore(field, company, weights) {
    const criteria = Repository.getAllCriteria();
    return Service.getScoreByCriteria(criteria.get(field), company[field]) * weights.get(field);
  }

  static calculateUserScoring(company, weights) {
    return this.getUnweightedUserScoring(company) * weights.get('userScoring');
  }

  static getUnweightedUserScoring(company) {
    return company.userScoring?.length ? company.userScoring.reduce((accumulator, currentValue) => accumulator + currentValue) / company.userScoring.length : MINIMUM_VALUE;
  }

  static calculateTotalScoreById(id) {
    return Service.runAlgorithm(Repository.getCompanyById(id));
  }
}