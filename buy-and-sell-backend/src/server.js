"use strict";

const Hapi = require("@hapi/hapi");
import * as admin from "firebase-admin";
import credentials from "../credentials.json";
import { db } from "./database";
import routes from "./routes";

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

let server;

const start = async () => {
  server = Hapi.server({
    port: 8000,
    host: "localhost",
  });

  routes.forEach((route) => server.route(route));

  db.connect();
  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

process.on("SIGINT", async () => {
  console.log("Stopping server...");
  await server.stop({ timeout: 1000 });
  db.end();
  console.log("Server stopped");
  process.exit(0);
});

start();
