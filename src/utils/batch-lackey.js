import {Repository} from "../api/repository.js";
import {Service} from "../api/service.js";
import {COMPANIES_COLLECTION, CRITERIA_COLLECTION, WEIGHTS_COLLECTION} from "./consts.js";
import * as fs from "fs";

const FILE_PATH = `.\\..\\..`;
const FILE_NAME = `scoring`;
const FILE_TYPE = `txt`;

class BatchLackey {
  static async run() {
    try {
      await Service.init();
      await fs.writeFile(BatchLackey.getFileName(), JSON.stringify(await this.getCompanyScores()), (() => console.log(`Success writing to file`)));
    } catch (e) {
      console.error(`Batch job failed. Error: ${e.message}`);
    }
  }

  static async getCompanyScores() {
    const weights = await Repository.getAll(WEIGHTS_COLLECTION);
    const criteria = await Repository.getAll(CRITERIA_COLLECTION);
    return Promise.all((await Repository.getAllDocumentsInCollection(COMPANIES_COLLECTION)).map(BatchLackey.getGetScoreByCompany(weights, criteria)));
  }

  static getGetScoreByCompany(weights, criteria) {
    return async function getScoreByCompany(company) {
      const companyScore = {};
      companyScore[company.name] = await Service.runAlgorithm(company, weights, criteria);
      return companyScore;
    };
  }

  static getFileName() {
    return `${FILE_PATH}\\${FILE_NAME}.${FILE_TYPE}`;
  }
}

BatchLackey.run();
