// Importa o módulo "express", um framework para criar aplicações web em Node.js
const express = require('express');

// Importa o módulo "cors" para permitir pedidos de origens diferentes (Cross-Origin Resource Sharing)
const cors = require('cors');

// Cria uma instância da aplicação Express
const app = express();

// Importa a biblioteca que gera a especificação Swagger/OpenAPI a partir de comentários nas rotas
const swaggerJSDoc = require('swagger-jsdoc');

// Importa o middleware que serve a interface gráfica do Swagger no browser
const swaggerUi = require('swagger-ui-express');


// Define a porta onde o servidor vai correr.
const PORT = process.env.PORT || 3000;

// Opções de configuração para o CORS (neste caso não estão a ser usadas no app.use)
// Apenas pedidos vindos de http://localhost são permitidos.
const corsOptions = {
    origin: 'http://localhost',
};

// Aplica o middleware CORS à aplicação.
// Sem argumentos, permite por omissão pedidos de qualquer origem.
app.use(cors());

// Objeto que define a configuração principal da documentação Swagger/OpenAPI
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

// Opções passadas ao swaggerJSDoc para gerar a especificação
const options = {
  // Configuração base definida acima
  swaggerDefinition,
  // Caminho para os ficheiros onde estão definidas as rotas da API e respetivos comentários Swagger
  apis: ['./app/routes/*.js'], // Caminho para os ficheiros que contêm as rotas da API
};


// Gera o objeto de especificação Swagger/OpenAPI com base nas opções fornecidas
const swaggerSpec = swaggerJSDoc(options);

// Middleware do Express para permitir receber e interpretar JSON no corpo dos pedidos HTTP
app.use(express.json());

// Middleware do Express para interpretar dados enviados por formulários (application/x-www-form-urlencoded)
// extended: true permite objetos e arrays mais complexos
app.use(express.urlencoded({ extended: true }));

// Rota principal (raiz da API).
app.get("/", (req, res) => {
    // Envia uma resposta em JSON com uma mensagem de boas-vindas
    res.json({ message: "Bem-vindo à API de Carros" });
});


// Importa e regista as rotas relacionadas com "carros".
require('./app/routes/carro.routes.js')(app);

// Regista a rota onde a documentação Swagger vai estar disponível.
// swaggerUi.serve é o middleware que serve os ficheiros estáticos da UI.
// swaggerUi.setup(swaggerSpec) configura a UI com a especificação gerada.
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Inicia o servidor HTTP a escutar na porta definida em PORT.
// A função de callback é executada assim que o servidor começa a correr.
app.listen(PORT, () => {
    console.log(`Servidor a correr na porta ${PORT}`);
    console.log(`Documentação Swagger disponível em http://localhost:${PORT}/api-docs`);
});



