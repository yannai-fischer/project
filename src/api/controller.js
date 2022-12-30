import {Service} from "./service.js";

export class Controller {
  static async init(expressApplication) {
    await Service.init();
    expressApplication.get('/calculateCompanyScoreById/:id', Controller.calculateCompanyScoreById());
    expressApplication.get('/getAllWeights', Controller.getAllWeights());
    expressApplication.get('/getAllDefaults', Controller.getAllDefaults());
    expressApplication.get('/getAllCriteria', Controller.getAllCriteria());
    expressApplication.post('/setDefault', Controller.setDefault);
    expressApplication.post('/setCriteria', Controller.setCriteria);
  }

  static calculateCompanyScoreById() {
    return async (req, res) => res.json({totalScore: await Service.calculateTotalScoreById(req.params.id)});
  }

  static getAllWeights() {
    return async (req, res) => res.json({weights: await Service.getAllWeights()});
  }

  static getAllCriteria() {
    return async (req, res) => res.json({weights: await Service.getAllCriteria()});
  }

  static getAllDefaults() {
    return async (req, res) => res.json({weights: await Service.getAllDefaults()});
  }

  static async setDefault(req, res) {
    const updatePayload = {};
    updatePayload[`${req.query.field}`] = +req.query.value;
    return res.json({success: !!await Service.setDefault(updatePayload)});
  }

  static async setCriteria(req, res) {
    const updatePayload = {};
    updatePayload[`${req.query.field}`] = JSON.parse(req.query.value);
    return res.json({success: !!await Service.setCriteria(updatePayload)});
  }
}