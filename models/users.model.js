'use strict';
require('dotenv').config();
const { sequelize, DataTypes } = require('./index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const API_SECRET = process.env.API_SECRET || 'some secret word';
const Users = sequelize.define('users', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    token: {
        type: DataTypes.VIRTUAL
    }
});
Users.authenticateBasic = async function (username, password) {
    const user = await this.findOne({ where: { username } });
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
        let newToken = jwt.sign({ username: user.username }, API_SECRET);
        user.token = newToken;
        return user;
    } else {
        throw new Error('Invalid User');
    }
}

Users.authenticateBearer = async function (token) {
    const parsedToken = jwt.verify(token, API_SECRET);
    const user = await this.findOne({ where: { username: parsedToken.username } });
    if (user) {
        return user;
    } else {
        throw new Error('Invalid Token');
    }
}
module.exports = Users;