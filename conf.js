const mysql = require("mysql");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.HOST_DB, // adresse du serveur
  user: process.env.USER_DB, // le nom d'utilisateur
  password: process.env.PASSWORD_DB, // le mot de passe
  database: process.env.DATABASE, // le nom de la base de données
});
module.exports = connection;
