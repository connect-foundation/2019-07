/**
 * 각 테이블의 CRUD를 담당하는 class가 상속하는 객체
 * 연결, 쿼리 등 공통된 부분을 관리한다
 *
 * @class Table
 * @param pool {mysql.createPool()} database와 연결할 때 사용하는 정보
 */
class Table {
  constructor(pool) {
    this.pool = pool;
  }

  /**
   * connection pool에서 연결을 받아오는 함수
   *
   * @returns {object} mysql2에서 연결 후 넘긴 connection 객체
   * @memberof Table
   */
  async connection() {
    return this.pool.getConnection(async (conn) => conn);
  }

  /**
   * connection 후 쿼리를 수행해주는 함수
   * 풀을 받아옴(연결) - 쿼리 - 풀 반납 순서를 거친다.
   *
   * @param {string} query mysql에서 실행할 쿼리
   * @param {list} args 쿼리의 ?에 들어갈 인자
   * @returns {object} rows 쿼리 후 받아온 결과 (성공시)
   * @returns {object} 에러 발생 시 return하는 객체 (에러)
   * @memberof Table
   */
  async query(query, ...args) {
    const connection = await this.connection();

    try {
      const [rows] = await connection.query(query, args);

      return JSON.parse(JSON.stringify(rows));
    } catch (err) {
      return {
        success: false,
        message: err.message,
      };
    } finally {
      connection.release();
    }
  }
}

module.exports = Table;
