const Livro = require('../models/Livro');
const Usuario = require('../models/User');

class Install {
  async insercao() {
    try {
      // Criação da tabela de livros
      await Livro.sync();

      // Inserção de dados iniciais na tabela de livros
      await Livro.bulkCreate([
        { titulo: 'Diario de um Banana', autor: 'Banana', quantidade_disponivel: 5 },
        { titulo: 'JavaScript para Iniciantes', autor: 'Coder Pro', quantidade_disponivel: 8 },
        { titulo: 'A Arte da Guerra', autor: 'Sun Tzu', quantidade_disponivel: 3 },
        { titulo: 'O Senhor dos Anéis', autor: 'J.R.R. Tolkien', quantidade_disponivel: 10 },
        { titulo: 'Inteligência Artificial 101', autor: 'AI Expert', quantidade_disponivel: 7 },
        { titulo: 'História do Brasil', autor: 'Historiador Famoso', quantidade_disponivel: 12 },
        { titulo: 'A Culpa é das Estrelas', autor: 'John Green', quantidade_disponivel: 6 },
        { titulo: 'Python para Ciência de Dados', autor: 'Data Scientist', quantidade_disponivel: 4 },
      ]);

      // Criação da tabela de usuários
      await Usuario.sync();

      // Inserção de dados iniciais na tabela de usuários
      await Usuario.bulkCreate([
        { nome: 'Admin 1', email: 'admin1@example.com', cargo: 1 },
        { nome: 'Admin 2', email: 'admin2@example.com', cargo: 1 },
        { nome: 'Usuário 1', email: 'usuario1@example.com', cargo: 0 },
        { nome: 'Usuário 2', email: 'usuario2@example.com', cargo: 0 },
        { nome: 'Usuário 3', email: 'usuario3@example.com', cargo: 0 },
        { nome: 'Usuário 4', email: 'usuario4@example.com', cargo: 0 },
        { nome: 'Usuário 5', email: 'usuario5@example.com', cargo: 0 },
        { nome: 'Usuário 6', email: 'usuario6@example.com', cargo: 0 },
        { nome: 'Usuário 7', email: 'usuario7@example.com', cargo: 0 },
        { nome: 'Usuário 8', email: 'usuario8@example.com', cargo: 0 },
      ]);

      console.log('Instalação concluída com sucesso!');
    } catch (error) {
      console.error(error);
      console.log('Erro durante a instalação.');
    }
  }
}

module.exports = new Install();
