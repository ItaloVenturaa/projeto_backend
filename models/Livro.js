const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Livro = sequelize.define(
  'Livro',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    autor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantidade_disponivel: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'livros',
    timestamps: false,
  }
);

Livro.prototype.findAll = async function () {
  try {
    const result = await Livro.findAll({ attributes: ['id', 'titulo', 'autor', 'quantidade_disponivel'] });
    return result;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

Livro.prototype.findById = async function (id) {
  try {
    const result = await Livro.findByPk(id, { attributes: ['id', 'titulo', 'autor', 'quantidade_disponivel'] });
    return result;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

Livro.prototype.create = async function (titulo, autor, quantidade_disponivel) {
  try {
    await Livro.create({ titulo, autor, quantidade_disponivel });
  } catch (err) {
    console.log(err);
  }
};

Livro.prototype.update = async function (id, titulo, autor, quantidade_disponivel) {
  const livro = await this.findById(id);

  if (livro !== undefined) {
    const editLivro = {};

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
      await Livro.update(editLivro, { where: { id } });
      return { status: true };
    } catch (err) {
      return { status: false, err };
    }
  } else {
    return { status: false, err: 'O livro não existe!' };
  }
};

Livro.prototype.delete = async function (id) {
  const livro = await this.findById(id);

  if (livro !== undefined) {
    try {
      await Livro.destroy({ where: { id } });
      return { status: true };
    } catch (err) {
      return { status: false, err };
    }
  } else {
    return { status: false, err: 'O livro não existe, portanto não pode ser deletado' };
  }
};

module.exports = Livro;
