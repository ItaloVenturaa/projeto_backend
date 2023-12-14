const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');
const bcrypt = require('bcrypt');
const PasswordToken = require('./PasswordToken');

//modelo User
const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cargo: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: 'users',
    timestamps: false,
  }
);

//buscar todos os usuários
User.prototype.findAll = async function () {
  try {
    const result = await User.findAll({ attributes: ['id', 'nome', 'email', 'cargo'] });
    return result;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

//buscar usuário por ID
User.prototype.findById = async function (id) {
  try {
    const result = await User.findByPk(id, { attributes: ['id', 'nome', 'email', 'cargo'] });
    return result;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

//criar novo usuário
User.prototype.new = async function (email, senha, name) {
  try {
    const hash = await bcrypt.hash(senha, 2);
    await User.create({ email, senha: hash, nome: name, cargo: 0 });
  } catch (err) {
    console.log(err);
  }
};

//verificar se o email já está cadastrado
User.prototype.findEmail = async function (email) {
  try {
    const result = await User.findOne({ where: { email } });
    return result !== null;
  } catch (err) {
    console.log(err);
    return false;
  }
};

//buscar usuário por email
User.prototype.findByEmail = async function (email) {
  try {
    const result = await User.findOne({ where: { email }, attributes: ['id', 'nome', 'email', 'senha', 'cargo'] });
    return result;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

//atualizar informações do usuário
User.prototype.update = async function (id, email, name, cargo) {
  const user = await this.findById(id);

  if (user !== undefined) {
    const editUser = {};

    if (email !== undefined && email !== user.email) {
      const result = await this.findEmail(email);
      if (!result) {
        editUser.email = email;
      } else {
        return { status: false, err: 'O email já está cadastrado!' };
      }
    }

    if (name !== undefined) {
      editUser.nome = name;
    }

    if (cargo !== undefined) {
      editUser.cargo = cargo;
    }

    try {
      await User.update(editUser, { where: { id } });
      return { status: true };
    } catch (err) {
      return { status: false, err };
    }
  } else {
    return { status: false, err: 'O usuário não existe!' };
  }
};

//deletar usuário por ID
User.prototype.delete = async function (id) {
  const user = await this.findById(id);
  if (user !== undefined) {
    try {
      await User.destroy({ where: { id } });
      return { status: true };
    } catch (err) {
      return { status: false, err };
    }
  } else {
    return { status: false, err: 'O usuário não existe, portanto não pode ser deletado' };
  }
};

//alterar a senha do usuário
User.prototype.changePassword = async function (newPassword, id, token) {
  const hash = await bcrypt.hash(newPassword, 2);
  await User.update({ senha: hash }, { where: { id } });
  await PasswordToken.setUsed(token);
};

module.exports = User;
