const express = require('express');
const cors = require('cors');
const app = express();

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const e = require('express');


const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: 'http://localhost',
};

const swaggerDefinition = {
  openapi: '3.0.1',
  info: {
    title: 'API Carros | Documentação | 2025',
    version: '1.0.0',
    description: 'Documentação da REST API de Carros',
    contact: {
      name: 'IPVC . ESTG . André Moreira',
      email: 'andre.moreira@ipvc.pt'
    }
  },
  basePath: '/',
};

const options = {
  swaggerDefinition,
  apis: ['./app/routes/*.js'], // Caminho para os ficheiros que contêm as rotas da API
};


const swaggerSpec = swaggerJSDoc(options);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Bem-vindo à API de Carros" });
});


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.listen(PORT, () => {
    console.log(`Servidor a correr na porta ${PORT}`);
    console.log(`Documentação Swagger disponível em http://localhost:${PORT}/api-docs`);
});



