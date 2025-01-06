// BACKEND CORE
// IMAGE UPLOADER

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const router = require("./router");
const path = require('path');

const app = express();
app.use(express.json());
app.use(router);

// Configuração de CORS
app.use(cors()); // Permite requisições de qualquer origem
// ou para maior controle:
// app.use(cors({ origin: 'http://localhost:3000' }));

app.use('/images', express.static(path.resolve(__dirname, '../frontend/public/images')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '../frontend/public/images')); // Resolve o caminho absoluto
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nome único para o arquivo
  },
});

const upload = multer({ storage: storage });

// Rota para o upload de arquivos
app.post('/upload', upload.array('images'), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'Nenhum arquivo enviado!' });
  }

  const filePaths = req.files.map((file) => ({
    filename: file.filename,
    url: `/images/${file.filename}`,
  }));

  res.status(200).json({ paths: filePaths });
});

const porta = 5000;
const host = "localhost";

app.listen(porta, host, () => {
  console.log(`Rodando em: ${host}:${porta}`);
});