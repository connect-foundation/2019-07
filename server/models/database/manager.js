const mysql = require('mysql2/promise');

require('dotenv').config();

const Analysis = require('./tables/Analysis');
const Item = require('./tables/Item');
const Package = require('./tables/Package');
const Quiz = require('./tables/Quiz');
const Room = require('./tables/Room');
const User = require('./tables/User');

/**
 * 데이터베이스에 접근하는 CRUD를 전부 관리하는 객체
 *
 * @class DatabaseManager
 */
class DatabaseManager {
  constructor(pool) {
    this.pool = pool;

    this.analysis = new Analysis(this.pool);
    this.item = new Item(this.pool);
    this.package = new Package(this.pool);
    this.quiz = new Quiz(this.pool);
    this.room = new Room(this.pool);
    this.user = new User(this.pool);
  }
}

const manager = new DatabaseManager(
  mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
  }),
);

module.exports = manager;
