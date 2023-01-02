import {Service} from "./service.js";
import {COMPANIES_COLLECTION, CRITERIA_COLLECTION, DEFAULTS_COLLECTION, WEIGHTS_COLLECTION} from "../utils/consts.js";

const ADMIN_COLLECTIONS = [DEFAULTS_COLLECTION];
const ADMIN_FIELDS = ['userScoring'];
const ACCEPTABLE_REQUEST_TYPES = ['GET', `POST`];

export class Controller {
  static async init(expressApplication) {
    await Service.init();
    expressApplication.use(``, Controller.prepareApp);
    expressApplication.get('/calculateCompanyScoreById/:id', Controller.calculateCompanyScoreById);
    expressApplication.get('/getAllWeights', Controller.getGetAllFunction(WEIGHTS_COLLECTION));
    expressApplication.get('/getAllDefaults', Controller.getGetAllFunction(DEFAULTS_COLLECTION));
    expressApplication.get('/getAllCriteria', Controller.getGetAllFunction(CRITERIA_COLLECTION));
    expressApplication.get('/getAllCompanyBusinessCards', Controller.getCompanyBusinessCards);
    expressApplication.post('/setDefault', Controller.getSetFieldFunction(DEFAULTS_COLLECTION));
    expressApplication.post('/setCriteria', Controller.getSetFieldFunction(CRITERIA_COLLECTION));
  }

  static prepareApp(req, res, next) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', ACCEPTABLE_REQUEST_TYPES.join(`,`));
      res.setHeader('Access-Control-Allow-Methods', 'Content-Type', 'Authorization');
      next();
  }

  static async calculateCompanyScoreById(req, res) {
    return res.json({totalScore: await Service.calculateTotalScoreById(req.params.id, COMPANIES_COLLECTION)});
  }

  static getGetAllFunction(collection) {
    return async (req, res) => {
      console.log(`Got request to get all ${collection}`);
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
        const field = req.query.field;
        const isAdmin = !!req.query?.isAdmin;
        updatePayload[`${field}`] = JSON.parse(req.query.value);
        console.log(`Got request to set ${JSON.stringify(updatePayload)} in ${collection} ${isAdmin ? `from admin` : ``}`);
        return res.json(isAdmin || Controller.isUserRequestValid(collection, field) ? !!await Service.setField(updatePayload, collection) : {message: `Unauthorised action. Please contact an admin`});
      } catch (e) {
        res.json({message: `Request to set ${JSON.stringify(updatePayload)} in ${collection} failed. Error: ${e.message}`});
      }
    };
  }

  static async getCompanyBusinessCards(req, res) {
    try {
      console.log(`Got request to get all company business cards`);
      return res.json(await Service.getCompanyBusinessCards());
    } catch (e) {
      res.json({message: `Request to get company business cards failed. Error: ${e.message}`});
    }
  }

  static isUserRequestValid(collection, field) {
    return !(ADMIN_COLLECTIONS.find(adminCollection => adminCollection === collection) || ADMIN_FIELDS.find(adminField => adminField === field));
  }
}
