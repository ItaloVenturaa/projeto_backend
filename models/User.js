var knex = require("../database/connection");
var bcrypt = require("bcrypt");
const PasswordToken = require("./PasswordToken");
//service

class User {


    async findAll() {
        try {
            var result = await knex.select(["id", "nome", "email", "cargo"]).table("users");

            if (result.length > 0) {
                return result[0];
            } else {
                return undefined;
            }

        } catch (err) {
            console.log(err);
            return undefined;
        }
    }

    async findById(id) {
        try {
            var result = await knex.select(["id", "nome", "email", "cargo"]).where({ id: id }).table("users");
            if (result.length > 0) {
                return result[0];
            } else {
                return undefined;
            }
        } catch (err) {
            console.log(err);
            return undefined;
        }
    }



    async new(email, senha, name) {

        try {
            //hash é a senha crua e codificada, para garantir a privacidade do usuario
            var hash = await bcrypt.hash(senha, 2);

            await knex.insert({ email, senha: hash, name, cargo: 0 }).table("users");

        } catch (err) {
            console.log(err);
        }
    }

    //aqui eu confiro se o email do usuario ja exite no banco ou não
    async findEmail(email) {
        try {
            var result = await knex.select("*").from("users").where({ email: email });
            return result.length > 0;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async findByEmail(email) {
        try {
            var result = await knex.select(["id", "nome","senha", "email", "cargo"]).where({ email: email }).table("users");
            if (result.length > 0) {
                return result[0];
            } else {
                return undefined;
            }
        } catch (err) {
            console.log(err);
            return undefined;
        }
    }




    async update(id, email, name, cargo) {

        var user = await this.findById(id);

        if (user != undefined) {

            var editUser = {};

            if (email != undefined) {
                if (email != user.email) {
                    var result = await this.findEmail(email);
                    if (result == false) {
                        editUser.email = email;
                    } else {
                        return { status: false, err: "O email ja esta cadastrado!" };
                    }
                }
            }

            if (name != undefined) {
                editUser.name = name;
            }

            if (cargo != undefined) {
                editUser.cargo = cargo;
            }

            try {
                await knex.update(editUser).where({ id: id }).table("users");
                return { status: true };
            } catch (e) {
                return { status: false, err: err };
            }

        } else {
            return { status: false, err: "O usuario não existe!" };
        }

    }

    async delete(id) {
        var user = await this.findById(id);
        if (user != undefined) {
            try {
                await knex.delete().where({ id: id }).table("users");
                return { status: true };
            }
            catch (err) {
                return { status: false, err: err }
            }
        } else {
            return { status: false, err: "O usuario não existe, portanto não pode ser deletado" }
        }
    }



    async changePassword(newPassword, id, token) {
        var hash = await bcrypt.hash(newPassword, 2);
        await knex.update({ senha: hash }).where({ id: id }).table("users");
        await PasswordToken.setUsed(token);
    }

}

module.exports = new User();