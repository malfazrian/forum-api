/* istanbul ignore file */
const pool = require("../src/Infrastructures/database/postgres/pool");

const CommentsTableTestHelper = {
  async addCommentThread({
    id = "comment-123",
    threadId = "thread-123",
    owner = "user-123",
    date = "2021-08-08T07:22:33.555Z",
    content = "sebuah komentar",
    is_delete = false,
  }) {
    const query = {
      text: "INSERT INTO comments VALUES($1, $2, $3, $4, $5, $6)",
      values: [id, threadId, owner, date, content, is_delete],
    };

    await pool.query(query);
  },

  async findCommentById(id) {
    const query = {
      text: "SELECT * FROM comments WHERE id = $1",
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async getCommentThreadDeleteStatus(id) {
    const query = {
      text: "SELECT * FROM comments WHERE id = $1",
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows[0];
  },

  async cleanTable() {
    await pool.query("DELETE FROM comments WHERE 1=1");
  },
};

module.exports = CommentsTableTestHelper;
