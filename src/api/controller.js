import {Service} from "./service.js";

export class Controller {
  static async init(expressApplication) {
    await Service.init();
    expressApplication.get('/calculateById/:id', async (req, res) => res.json({totalScore: await Service.calculateTotalScoreById(req.params.id)}));
  }
}