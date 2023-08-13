import express from "express";
import { config } from "dotenv";
import { initializeClient } from "./database/config";

config();

const app = express();
initializeClient();

app.listen(process.env.PORT || 3333, () => {
  console.log("Server listening on port ", process.env.PORT || 3333);
});
