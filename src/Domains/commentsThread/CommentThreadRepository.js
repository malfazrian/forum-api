class CommentThreadRepository {
  async addCommentThread(postCommentThread) {
    throw new Error("COMMENT_THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async verifyCommentThreadExist(commentId) {
    throw new Error("COMMENT_THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async verifyCommentOwner(commentId, ownerId) {
    throw new Error("COMMENT_THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async deleteCommentThread(deleteCommentThread) {
    throw new Error("COMMENT_THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async getCommentsByThreadId(threadId) {
    throw new Error("COMMENT_THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }
}

module.exports = CommentThreadRepository;
