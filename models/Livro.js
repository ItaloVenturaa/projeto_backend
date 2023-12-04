var knex = require("../database/connection");

class Livro {
    async findAll() {
        try {
            var result = await knex.select(["id", "titulo", "autor", "quantidade_disponivel"]).table("livros");

            if (result.length > 0) {
                return result;
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
            var result = await knex.select(["id", "titulo", "autor", "quantidade_disponivel"]).where({ id: id }).table("livros");
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

    async create(titulo, autor, quantidade_disponivel) {
        try {
            await knex.insert({ titulo, autor, quantidade_disponivel }).table("livros");
        } catch (err) {
            console.log(err);
        }
    }

    async update(id, titulo, autor, quantidade_disponivel) {
        var livro = await this.findById(id);

        if (livro !== undefined) {
            var editLivro = {};

            if (titulo !== undefined) {
                editLivro.titulo = titulo;
            }

            if (autor !== undefined) {
                editLivro.autor = autor;
            }

            if (quantidade_disponivel !== undefined) {
                editLivro.quantidade_disponivel = quantidade_disponivel;
            }

            try {
                await knex.update(editLivro).where({ id: id }).table("livros");
                return { status: true };
            } catch (err) {
                return { status: false, err: err };
            }
        } else {
            return { status: false, err: "O livro não existe!" };
        }
    }

    async delete(id) {
        var livro = await this.findById(id);

        if (livro !== undefined) {
            try {
                await knex.delete().where({ id: id }).table("livros");
                return { status: true };
            } catch (err) {
                return { status: false, err: err };
            }
        } else {
            return { status: false, err: "O livro não existe, portanto não pode ser deletado" };
        }
    }
}

module.exports = new Livro();
