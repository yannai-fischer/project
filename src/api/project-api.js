import express from "express";
import {Controller} from "./controller.js";

const PORT = 8081;

export class ProjectApi {
  static async run() {
    const expressApplication = express();
    const server = await expressApplication.listen(PORT);
    await Controller.init(expressApplication);
    console.log(`App listening on port:${server.address().port}`);
  }
}