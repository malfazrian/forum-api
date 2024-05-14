const NotFoundError = require("../../Commons/exceptions/NotFoundError");
const PostedThread = require("../../Domains/threads/entities/PostedThread");
const ThreadDataById = require("../../Domains/threads/entities/ThreadDataById");
const ThreadRepository = require("../../Domains/threads/ThreadRepository");

class ThreadRepositoryPostgres extends ThreadRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async verifyThreadExist(threadId) {
    const query = {
      text: "SELECT id FROM threads WHERE id = $1",
      values: [threadId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError("thread tidak ditemukan");
    }
  }

  async addThread(postThread) {
    const { title, body, owner } = postThread;
    const id = `thread-${this._idGenerator()}`;
    const date = new Date().toISOString();
    const query = {
      text: "INSERT INTO threads VALUES($1, $2, $3, $4, $5) RETURNING id, title, username",
      values: [id, title, body, date, owner],
    };
    const result = await this._pool.query(query);

    const {
      id: postId,
      title: postTitle,
      username: postOwner,
    } = result.rows[0];
    return new PostedThread({ id: postId, title: postTitle, owner: postOwner });
  }

  async getThreadById(payload) {
    const { threadId } = payload;

    const query = {
      text: `
        SELECT t.id, t.title, t.body, t.date, u.username AS username
        FROM threads t
        JOIN users u ON t.username = u.id
        WHERE t.id = $1;
    `,
      values: [threadId],
    };

    const threadResult = await this._pool.query(query);

    if (!threadResult.rowCount) {
      throw new NotFoundError("thread tidak ditemukan");
    }

    const thread = {
      id: threadResult.rows[0].id,
      title: threadResult.rows[0].title,
      body: threadResult.rows[0].body,
      date: threadResult.rows[0].date,
      username: threadResult.rows[0].username,
      comments: [],
    };

    return new ThreadDataById(thread);
  }
}

module.exports = ThreadRepositoryPostgres;
