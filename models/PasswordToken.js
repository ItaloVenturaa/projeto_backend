const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

//modelo Token
const Token = sequelize.define('Token', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  used: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

class PasswordToken {
  //criar um token de senha
  async create(email) {
    const user = await User.findByEmail(email);

    if (user) {
      try {
        const token = Date.now().toString();
        await Token.create({
          user_id: user.id,
          used: false,
          token: token,
        });

        return { status: true, token: token };
      } catch (error) {
        console.log(error);
        return { status: false, err: error };
      }
    } else {
      return { status: false, err: 'O email passado não existe no banco de dados!' };
    }
  }

  //validar um token
  async validate(token) {
    try {
      const passwordToken = await Token.findOne({
        where: { token: token },
      });

      if (passwordToken) {
        if (passwordToken.used) {
          return { status: false };
        } else {
          return { status: true, token: passwordToken };
        }
      } else {
        return { status: false };
      }
    } catch (error) {
      console.log(error);
      return { status: false };
    }
  }

  //marcar um token como usado
  async setUsed(token) {
    await Token.update({ used: true }, { where: { token: token } });
  }
}

module.exports = new PasswordToken();
