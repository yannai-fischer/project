import express from "express";
import {Controller} from "./api/controller.js";

class Index {
  static run() {
    const expressApplication = express();
    const server = expressApplication.listen(8081, function () {
      const host = server.address().address;
      const port = server.address().port;
      console.log("Example app listening at http://%s:%s", host, port);
      new Controller(expressApplication);
    });
  }
}

//TODO: Go over package.json

Index.run();
