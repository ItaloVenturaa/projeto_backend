var User = require("../models/User");
var PasswordToken = require("../models/PasswordToken");
var jwt = require("jsonwebtoken");
var secret = "913874wefdnsdfnslk0934emn3ddedlllll4";
var bcrypt = require("bcrypt");

class UserController {

    //todos os usuários
    async list(req, res) {
        var users = await User.findAll();
        res.json(users);
    }

    //busca um usuário por ID
    async findUser(req, res) {
        var id = req.params.id;
        var user = await User.findById(id);
        if (user == undefined) {
            res.status(404);
            res.json({});
        } else {
            res.status(200);
            res.json(user);
        }
    }

    //cria um novo usuário
    async create(req, res) {
        var { email, senha, name } = req.body;

        if (email == undefined) {
            res.status(400);
            res.json({ err: "Email inválido!" })
            return;
        }
        if (senha == undefined) {
            res.status(400);
            res.json({ err: "Senha inválida!" })
            return;
        }
        if (name == undefined) {
            res.status(400);
            res.json({ err: "Nome inválido!" })
            return;
        }

        var emailExists = await User.findEmail(email);
        if (emailExists) {
            res.status(406);
            res.json({ err: "Email já está cadastrado!" })
            return;
        }

        await User.new(email, senha, name);

        res.status(200);
        res.send("Tudo ok!");
    }

    //edita um usuário
    async edit(req, res) {
        var { id, email, cargo, name } = req.body;
        var result = await User.update(id, email, cargo, name);
        if (result != undefined) {
            if (result.status) {
                res.status(200);
                res.send("Tudo ok!");
            } else {
                res.status(406);
                res.json(result.err);
            }
        } else {
            res.status(404);
            res.send("Ocorreu um erro no servidor!");
        }
    }

    //remove um usuário por ID
    async remove(req, res) {
        var id = req.params.id;
        var result = await User.delete(id);

        if (result.status) {
            res.status(200);
            res.send("Tudo ok!");
        } else {
            res.status(406);
            res.send(result.err);
        }
    }

    //solicita recuperação de senha
    async recoverPassword(req, res) {
        var email = req.body.email;
        var result = await PasswordToken.create(email);
        if (result.status) {
            res.status(200);
            res.send("" + result.token);
        } else {
            res.status(406);
            res.send(result.err);
        }
    }

    //altera a senha com base em um token
    async changePassword(req, res) {
        var token = req.body.token;
        var password = req.body.password; 
    
        var isTokenValid = await PasswordToken.validate(token);
    
        if (isTokenValid.status) {
            await User.changePassword(password, isTokenValid.token.user_id, isTokenValid.token.token);
            res.status(200);
            res.send("Senha alterada");
        } else {
            res.status(406);
            res.send("Token inválido");
        }
    }

    //login do usuário
    async login(req, res) {
        var { email, senha } = req.body;

        var user = await User.findByEmail(email);

        if (user != undefined) {

            var resultado = await bcrypt.compare(senha, user.senha);

            if (resultado) {

                var token = jwt.sign({ email: user.email, cargo: user.cargo }, secret);
                res.status(200);
                res.json({ token: token });

            } else {
                res.status(406);
                res.send("Senha incorreta!");
            }

        } else {
            res.json({ status: false });
        }
    }

    //cria um administrador
    async createAdmin(req, res) {
        var { email, senha, name } = req.body;

        //verifica se é um administrador
        if (req.userData.cargo !== 1) {
            res.status(403); //código de status para "Forbidden"
            res.json({ err: "Apenas administradores podem criar outros administradores." });
            return;
        }

        if (email == undefined || senha == undefined || name == undefined) {
            res.status(400);
            res.json({ err: "Dados inválidos!" });
            return;
        }

        var emailExists = await User.findEmail(email);
        if (emailExists) {
            res.status(406);
            res.json({ err: "Email já cadastrado!" });
            return;
        }

        //novo administrador
        await User.new(email, senha, name, 1);

        res.status(200);
        res.send("Administrador criado com sucesso!");
    }

}

module.exports = new UserController();
