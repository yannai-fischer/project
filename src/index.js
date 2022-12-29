import express from "express";
import {Controller} from "./api/controller.js";

class Index {
  static async run() {
    const expressApplication = express();
    const server = await expressApplication.listen(8081, async () => {
      const host = server.address().address;
      const port = server.address().port;
      await Controller.init(expressApplication);
      console.log("Example app listening at http://%s:%s", host, port);
    });
  }
}

//TODO: Go over package.json

Index.run();
