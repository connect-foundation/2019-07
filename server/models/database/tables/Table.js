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
   * connection 후 쿼리를 수행해주는 함수
   * 풀을 받아옴(연결) - 쿼리 - 풀 반납 순서를 거친다.
   *
   * @param {string} query mysql에서 실행할 쿼리
   * @param {list} args 쿼리의 ?에 들어갈 인자
   * @returns {object} rows 쿼리 후 받아온 rows를 포함한 객체 (성공시)
   * @returns {object} 에러 발생 시 return하는 객체 (에러)
   * @memberof Table
   */
  async query(query, ...args) {
    try {
      const connection = await this.pool.getConnection(async (conn) => conn);

      try {
        const [rows] = await connection.query(query, args);

        return {
          isSuccess: true,
          data: JSON.parse(JSON.stringify(rows)),
        };
      } catch (error) {
        return {
          isError: true,
          message: error.message,
        };
      } finally {
        connection.release();
      }
    } catch (error) {
      return {
        isError: true,
        message: error.message,
      };
    }
  }

  /**
   * connection 후 트랜잭션을 수행해주는 함수
   * 풀을 받아옴(연결) - 트랜잭션 시작 - 쿼리 - 커밋/롤백 - 풀 반납 순서를 거친다.
   *
   * @param {string} query mysql에서 실행할 쿼리
   * @param {list} args 쿼리의 ?에 들어갈 인자
   * @returns {object} rows 쿼리 후 받아온 rows를 포함한 객체 (성공시)
   * @returns {object} 에러 발생 시 return하는 객체 (에러)
   * @memberof Table
   */
  async transaction(query, ...args) {
    try {
      const connection = await this.pool.getConnection(async (conn) => conn);

      try {
        await connection.beginTransaction();
        const [rows] = await connection.query(query, args);
        await connection.commit();

        return {
          isSuccess: true,
          data: JSON.parse(JSON.stringify(rows)),
        };
      } catch (error) {
        await connection.rollback();

        return {
          isError: true,
          message: error.message,
        };
      } finally {
        connection.release();
      }
    } catch (error) {
      return {
        isError: true,
        message: error.message,
      };
    }
  }
}

module.exports = Table;
