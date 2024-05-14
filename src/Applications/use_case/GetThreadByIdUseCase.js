const GetThreadById = require("../../Domains/threads/entities/GetThreadById");
const GetCommentsByThreadId = require("../../Domains/commentsThread/entities/GetCommentsByThreadId");

class GetThreadByIdUseCase {
  constructor({ threadRepository, commentThreadRepository }) {
    this._threadRepository = threadRepository;
    this._commentThreadRepository = commentThreadRepository;
  }

  async execute(useCasePayload) {
    await this._threadRepository.verifyThreadExist(useCasePayload.threadId);
    const getThreadById = new GetThreadById(useCasePayload);
    const getCommentsByThreadId = new GetCommentsByThreadId(useCasePayload);
    const threadData = await this._threadRepository.getThreadById(
      getThreadById
    );

    let commentsData =
      await this._commentThreadRepository.getCommentsByThreadId(
        getCommentsByThreadId
      );

    // Handle CommentsDataByThreadId instance
    if (commentsData && commentsData.comments) {
      commentsData = commentsData.comments;
    } else {
      commentsData = [];
    }

    // Modify comments content if is_delete is true
    const modifiedComments = commentsData.map((comment) => {
      if (comment.is_delete) {
        return {
          id: comment.id,
          username: comment.username,
          date: comment.date,
          content: "**komentar telah dihapus**",
        };
      }
      // Omit is_delete property from the comment
      const { is_delete, ...cleanComment } = comment;
      return cleanComment;
    });

    threadData.comments.push(...modifiedComments);

    return threadData;
  }
}

module.exports = GetThreadByIdUseCase;
