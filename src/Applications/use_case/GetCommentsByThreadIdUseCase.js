const GetCommentsByThreadId = require("../../Domains/commentsThread/entities/GetCommentsByThreadId");

class GetCommentsByThreadIdUseCase {
  constructor({ commentThreadRepository }) {
    this._commentThreadRepository = commentThreadRepository;
  }

  async execute(useCasePayload) {
    const getCommentsByThreadId = new GetCommentsByThreadId(useCasePayload);
    const result = await this._commentThreadRepository.getCommentsByThreadId(
      getCommentsByThreadId
    );
    const comments = [];

    result.rows.forEach((row) => {
      comments.push({
        id: row.id,
        username: row.username,
        date: row.date,
        is_delete: row.is_delete,
        content: row.content,
      });
    });

    return comments;
  }
}

module.exports = GetCommentsByThreadIdUseCase;
