import {Service} from "./service.js";

const COMPANIES_COLLECTION = 'companies';
const DEFAULTS_COLLECTION = 'defaults';
const WEIGHTS_COLLECTION = 'weights';
const CRITERIA_COLLECTION = 'criteria';

export class Controller {
  static async init(expressApplication) {
    await Service.init();
    expressApplication.get('/calculateCompanyScoreById/:id', Controller.calculateCompanyScoreById);
    expressApplication.get('/getAllWeights', Controller.getGetAllFunction(WEIGHTS_COLLECTION));
    expressApplication.get('/getAllDefaults', Controller.getGetAllFunction(DEFAULTS_COLLECTION));
    expressApplication.get('/getAllCriteria', Controller.getGetAllFunction(CRITERIA_COLLECTION));
    expressApplication.post('/setDefault', Controller.getSetFieldFunction(DEFAULTS_COLLECTION));
    expressApplication.post('/setCriteria', Controller.getSetFieldFunction(CRITERIA_COLLECTION));
  }

  static async calculateCompanyScoreById(req, res) {
    return res.json({totalScore: await Service.calculateTotalScoreById(req.params.id)}, COMPANIES_COLLECTION);
  }

  static getGetAllFunction(collection) {
    return async (req, res) => {
      try {
        const response = {};
        response[collection] = await Service.getAll(collection);
        return res.json(response);
      } catch (e) {
        res.json({message: `Request to get all ${collection} failed. Error: ${e.message}`});
      }
    };
  }

  static getSetFieldFunction(collection) {
    const updatePayload = {};
    return async (req, res) => {
      try {
        updatePayload[`${req.query.field}`] = JSON.parse(req.query.value);
        return res.json({success: !!await Service.setField(updatePayload, collection)});
      } catch (e) {
        res.json({message: `Request to set ${updatePayload} in ${collection} failed. Error: ${e.message}`});
      }
    };
  }
}