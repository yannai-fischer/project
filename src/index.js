import express from "express";
import {Controller} from "./api/controller.js";

const PORT = 8081;

class Index {
  static async run() {
    const expressApplication = express();
    const server = await expressApplication.listen(PORT);
    await Controller.init(expressApplication);
    console.log(`App listening on port:${server.address().port}`);
  }
}

//TODO: Go over package.json

Index.run();
