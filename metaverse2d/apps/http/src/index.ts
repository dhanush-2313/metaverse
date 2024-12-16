import { router } from "./routes/v1/index.js";
import express = require("express");

const app = express();

app.use(express.json());
app.use("/api/v1",router);

app.listen(process.env.PORT || 3000);

