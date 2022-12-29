import {Service} from "./service.js";

export class Controller {

  expressApplication;

  constructor(expressApplication) {
    this.expressApplication = expressApplication;
    this.init();
  }

  init() {
    this.expressApplication.get('/calculateById/:id', (req, res) => res.json({totalScore: Service.calculateTotalScoreById(+req.params.id)}));
  }
}