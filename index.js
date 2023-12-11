var bodyParser = require('body-parser')
var express = require("express")
var app = express()
var router = require("./routes/route")
require('dotenv').config();
const { swaggerUi, swaggerSpec } = require('./swagger');
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//documentação Swagger
app.use('/docs', swaggerUi.serve);
app.get('/docs', swaggerUi.setup(swaggerSpec));

app.use("/",router);

const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});


