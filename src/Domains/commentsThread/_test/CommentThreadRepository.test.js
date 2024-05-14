const CommentThreadRepository = require("../CommentThreadRepository");

describe("CommentThreadRepository interface", () => {
  it("should throw error when invoke abstract behavior", async () => {
    // Arrange
    const commentThreadRepository = new CommentThreadRepository();

    // Action and Assert
    await expect(
      commentThreadRepository.addCommentThread({})
    ).rejects.toThrowError("COMMENT_THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED");
    await expect(
      commentThreadRepository.verifyCommentThreadExist("")
    ).rejects.toThrowError("COMMENT_THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED");
    await expect(
      commentThreadRepository.verifyCommentOwner("", "")
    ).rejects.toThrowError("COMMENT_THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED");
    await expect(
      commentThreadRepository.deleteCommentThread({})
    ).rejects.toThrowError("COMMENT_THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED");
    await expect(
      commentThreadRepository.getCommentsByThreadId("")
    ).rejects.toThrowError("COMMENT_THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  });
});
