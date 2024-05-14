const DeleteCommentThread = require("../../Domains/commentsThread/entities/DeleteCommentThread");

class DeleteCommentThreadUseCase {
  constructor({ commentThreadRepository }) {
    this._commentThreadRepository = commentThreadRepository;
  }

  async execute(useCasePayload) {
    const deleteCommentThread = new DeleteCommentThread(useCasePayload);
    await this._commentThreadRepository.verifyCommentThreadExist(
      deleteCommentThread.commentId
    );
    await this._commentThreadRepository.verifyCommentOwner(useCasePayload);
    return this._commentThreadRepository.deleteCommentThread(
      deleteCommentThread
    );
  }
}

module.exports = DeleteCommentThreadUseCase;
