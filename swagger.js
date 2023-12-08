const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Biblioteca',
      version: '1.0.0',
      description: 'Documentação da API de Biblioteca',
    },
  },
  apis: ['/routes/route.js'], //arquivo de rota
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerSpec };
