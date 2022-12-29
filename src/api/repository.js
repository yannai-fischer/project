const COMPANIES_MOCK = [
  {id: 1, name: 'govt', age: 2, totalScore: 0, funding: 2, size: 1004, userScoring: [2,3,2,1,2,3,4,1,2,2]},
  {id: 2, name: 'nbc', age: 24, totalScore: 0, funding: 55, size: 105804, userScoring: [1,2,3,4,2,3,2,2]},
  {id: 3, name: 'cbs', age: 4, totalScore: 0, funding: 34, size: 54553, userScoring: []}];
const WEIGHTS_MOCK = new Map([['size', 0.3], ['funding', 0.4], ['age', 0.2], ['userScoring', 0.1]]);
const CRITERIA_MOCK = new Map([['size', [1, 10, 100, 1000]], ['funding', [0, 1, 10, 100]], ['age', [0, 1, 5, 12]]]);

export class Repository {
  static getCompanyById(id) {
    return COMPANIES_MOCK.find(company => company.id === id);
  }

  static getAllWeights() {
    return WEIGHTS_MOCK;
  }

  static getAllCriteria() {
    return CRITERIA_MOCK;
  }
}