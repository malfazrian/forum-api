/* istanbul ignore file */
const pool = require("../src/Infrastructures/database/postgres/pool");
const Jwt = require("@hapi/jwt");

const ThreadsTableTestHelper = {
  async addThread({
    id = "thread-123",
    title = "sebuah judul",
    body = "sebuah thread",
    date = "2021-08-08T07:19:09.775Z",
    owner = "user-123",
  }) {
    const query = {
      text: "INSERT INTO threads VALUES($1, $2, $3, $4, $5)",
      values: [id, title, body, date, owner],
    };

    await pool.query(query);
  },

  async getThreadById(id) {
    const query = {
      text: "SELECT * FROM threads WHERE id = $1",
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  generateValidToken() {
    const payload = {
      id: "user-123",
    };

    const token = Jwt.token.generate(payload, {
      key: process.env.ACCESS_TOKEN_KEY,
      algorithm: "HS256",
      expiresIn: process.env.ACCESS_TOKEN_AGE,
    });

    return token;
  },

  async cleanTable() {
    await pool.query("DELETE FROM threads WHERE 1=1");
  },
};

module.exports = ThreadsTableTestHelper;
