const NotFoundError = require("../../Commons/exceptions/NotFoundError");
const AuthorizationError = require("../../Commons/exceptions/AuthorizationError");
const PostedCommentThread = require("../../Domains/commentsThread/entities/PostedCommentThread");
const CommentThreadRepository = require("../../Domains/commentsThread/CommentThreadRepository");
const CommentsDataByThreadId = require("../../Domains/commentsThread/entities/CommentsDataByThreadId");

class CommentThreadRepositoryPostgres extends CommentThreadRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async verifyCommentThreadExist(commentId) {
    const query = {
      text: "SELECT id FROM comments WHERE id = $1",
      values: [commentId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError("Komentar tidak ditemukan");
    }
  }

  async verifyCommentOwner({ commentId, ownerId }) {
    const query = {
      text: "SELECT id, username FROM comments WHERE id = $1",
      values: [commentId],
    };

    const result = await this._pool.query(query);

    if (result.rows[0].username !== ownerId) {
      throw new AuthorizationError("Anda tidak berhak menghapus komentar ini");
    }
  }

  async addCommentThread(postCommentThread) {
    const { threadId, content, owner } = postCommentThread;
    const id = `comment-${this._idGenerator()}`;
    const date = new Date().toISOString();
    const is_delete = false;
    const query = {
      text: "INSERT INTO comments VALUES($1, $2, $3, $4, $5, $6) RETURNING id, content, username",
      values: [id, threadId, owner, date, content, is_delete],
    };
    const result = await this._pool.query(query);

    const {
      id: postId,
      content: postContent,
      username: postOwner,
    } = result.rows[0];
    return new PostedCommentThread({
      id: postId,
      content: postContent,
      owner: postOwner,
    });
  }

  async getCommentsByThreadId(getCommentsByThreadId) {
    const { threadId } = getCommentsByThreadId;
    const query = {
      text: `
        SELECT c.id, u.username, c.date, c.is_delete, c.content
        FROM comments c
        JOIN users u ON c.username = u.id
        WHERE c.thread_id = $1;
      `,
      values: [threadId],
    };

    const commentsResult = await this._pool.query(query);

    return new CommentsDataByThreadId(commentsResult.rows);
  }

  async deleteCommentThread(deleteCommentThread) {
    const { commentId } = deleteCommentThread;
    const is_delete = true;
    const query = {
      text: "UPDATE comments SET is_delete = $1 WHERE id = $2",
      values: [is_delete, commentId],
    };
    await this._pool.query(query);
  }
}

module.exports = CommentThreadRepositoryPostgres;
