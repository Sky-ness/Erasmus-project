import http from "http";
import express from "express";
import { env } from "node:process";

const app = express();
const httpServer = http.createServer(app);

if (env.PORT == undefined) {
  env.PORT = "8000";
}

// 					page principal
app.get("/", app.use(express.static("client/public")));

httpServer.listen(env.PORT, () => {
  console.log(`Server running at http://localhost:${env.PORT}/`);
});

console.log("wsh");
