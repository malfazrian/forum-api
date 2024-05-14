const PostCommentThread = require("../../Domains/commentsThread/entities/PostCommentThread");

class AddCommentThreadUseCase {
  constructor({ commentThreadRepository, threadRepository }) {
    this._commentThreadRepository = commentThreadRepository;
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload) {
    const postCommentThread = new PostCommentThread(useCasePayload);
    await this._threadRepository.verifyThreadExist(postCommentThread.threadId);
    return this._commentThreadRepository.addCommentThread(postCommentThread);
  }
}

module.exports = AddCommentThreadUseCase;
