require("dotenv/config")
const express = require('express');
const routes = require("./routes/index.js")
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

const port = process.env.PORT;
const host = process.env.HOST;

app.listen(port, host, () => {
  console.log(`🚀 Servidor rodando em: ${host}:${port}`);
});