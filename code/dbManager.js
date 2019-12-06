const mysql = require("mysql2/promise");

require("dotenv").config();

const Analysis = require("./tables/Analysis");
const Item = require("./tables/Item");
const Quizset = require("./tables/Quizset");
const Quiz = require("./tables/Quiz");
const Room = require("./tables/Room");
const User = require("./tables/User");

/**
 * dbManager객체는 tables 폴더 내부의 class로 생성된 객체들을 내부 요소로 가지고
 * 있습니다.
 *
 * 내부 class들은 Talbe.js를 상속하고 있으며, Table은 cosntructor로 db의 pool을
 * 가지고 있고, 아래와 같은 메소드를 가지고 있습니다.
 *
 * 1. async query()
 * 2. async transaction()
 *
 * 이러한 구조에서 개선할 부분이 있는지 여쭈어 보고 싶습니다
 * 특히 database 커넥션 부분에서 검토를 받고 싶습니다
 */

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
    this.quizset = new Quizset(this.pool);
    this.quiz = new Quiz(this.pool);
    this.room = new Room(this.pool);
    this.user = new User(this.pool);
  }
}

const dbManager = new DatabaseManager(
  mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD
  })
);

module.exports = dbManager;
