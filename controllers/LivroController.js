var Livro = require("../models/Livro");

class LivroController {
  //recupera um livro por ID
  async show(req, res) {
    const { id } = req.params;
    try {
      const livro = await Livro.query().findById(id);
      if (livro) {
        res.status(200);
        res.json({ livro, mensagem: 'Livro recuperado com sucesso' });
      } else {
        res.status(404);
        res.json({ mensagem: 'Livro não encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500);
      res.json({ mensagem: 'Erro ao recuperar o livro' });
    }
  }

  //cria um novo livro
  async create(req, res) {
    const { titulo, autor, quantidade_disponivel } = req.body;
    try {
      const novoLivro = await Livro.query().insert({ titulo, autor, quantidade_disponivel });
      res.status(201);
      res.json({ livro: novoLivro, mensagem: 'Livro criado com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500);
      res.json({ mensagem: 'Erro ao criar o livro' });
    }
  }

  //atualiza as informações de um livro por ID
  async update(req, res) {
    const { id } = req.params;
    const { titulo, autor, quantidade_disponivel } = req.body;
    try {
      const livroAtualizado = await Livro.query().patchAndFetchById(id, { titulo, autor, quantidade_disponivel });
      if (livroAtualizado) {
        res.status(200);
        res.json({ livro: livroAtualizado, mensagem: 'Livro atualizado com sucesso' });
      } else {
        res.status(404);
        res.json({ mensagem: 'Livro não encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500);
      res.json({ mensagem: 'Erro ao atualizar o livro' });
    }
  }

  //exclui um livro por ID
  async destroy(req, res) {
    const { id } = req.params;
    try {
      const livroExcluido = await Livro.query().deleteById(id);
      if (livroExcluido) {
        res.status(200);
        res.json({ mensagem: 'Livro excluído com sucesso' });
      } else {
        res.status(404);
        res.json({ mensagem: 'Livro não encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500);
      res.json({ mensagem: 'Erro ao excluir o livro' });
    }
  }

  //todos os livros
  async list(req, res) {
    try {
      const todosLivros = await Livro.query();
      res.status(200);
      res.json({ livros: todosLivros, mensagem: 'Lista de todos os livros recuperada com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500);
      res.json({ mensagem: 'Erro ao recuperar a lista de todos os livros' });
    }
  }
}

module.exports = new LivroController();
