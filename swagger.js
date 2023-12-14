const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

//configuração das opções para o Swagger
const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Biblioteca',
      version: '1.0.0',
      description: 'Documentação da API de Biblioteca',
    },
  },
  apis: ['./controllers/*.js', './models/*.js', '/routes/route.js'], //caminhos dos arquivos a serem incluídos na documentação
};

//geração do Swagger Specification
const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerSpec };
