import {Service} from "./service.js";

export class Controller {
  static async init(expressApplication) {
    await Service.init();
    expressApplication.get('/calculateCompanyScoreById/:id', async (req, res) => res.json({totalScore: await Service.calculateTotalScoreById(req.params.id)}));
    expressApplication.get('/getAllWeights', async (req, res) => res.json({weights: await Service.getAllWeights()}));
    expressApplication.post('/setDefault', Controller.setDefault);
  }

  static async setDefault(req, res) {
    return res.json({success: !!await Service.setDefault(req.query.field, req.query.value)});
  }
}