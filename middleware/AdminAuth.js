var jwt = require("jsonwebtoken");
var secret = "913874wefdnsdfnslk0934emn3ddedlllll4";

module.exports = function (req, res, next) {

    const authToken = req.headers['authorization'];

    if (authToken != undefined) {
        // aqui eu pego o cabeçario de atenticação e divido em dois 
        // "Bearer" "KJASHDFIQUDHKJASLDKLASJDFSAF"
        // pq o que eu quero é o token, o segundo da minha divisão 
        const bearer = authToken.split(' ');
        var token = bearer[1];
        //aqui eu extrai o token

        try {
            var decoded = jwt.verify(token, secret);

            if(decoded.role == 1){
                next();
            }else{
                res.status(403);
                res.send("Voce não tem permição para isso!");
                return;
            }
        } catch (err){  
            res.status(403);
            res.send("Voce não esta autenticado!");
            return;
        }

    } else {
        res.status(403);
        res.send("Voce não esta autenticado!");
        return;
    }
}