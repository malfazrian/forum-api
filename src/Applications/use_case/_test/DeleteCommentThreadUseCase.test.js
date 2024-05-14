const DeleteCommentThread = require("../../../Domains/commentsThread/entities/DeleteCommentThread");
const CommentThreadRepository = require("../../../Domains/commentsThread/CommentThreadRepository");
const DeleteCommentThreadUseCase = require("../DeleteCommentThreadUseCase");

describe("DeleteCommentThreadUseCase", () => {
  /**
   * Menguji apakah use case mampu mengoskestrasikan langkah demi langkah dengan benar.
   */
  it("should orchestrating the delete comment of thread action correctly", async () => {
    // Arrange
    const useCasePayload = {
      commentId: "comment-123",
      ownerId: "user-123",
    };

    /** creating dependency of use case */
    const mockCommentThreadRepository = new CommentThreadRepository();

    /** mocking needed function */
    mockCommentThreadRepository.verifyCommentThreadExist = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockCommentThreadRepository.verifyCommentOwner = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockCommentThreadRepository.deleteCommentThread = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    /** creating use case instance */
    const deleteCommentThreadUseCase = new DeleteCommentThreadUseCase({
      commentThreadRepository: mockCommentThreadRepository,
    });

    // Action
    await deleteCommentThreadUseCase.execute(useCasePayload);

    // Assert
    expect(mockCommentThreadRepository.verifyCommentThreadExist).toBeCalledWith(
      useCasePayload.commentId
    );

    expect(mockCommentThreadRepository.deleteCommentThread).toBeCalledWith(
      new DeleteCommentThread({
        commentId: useCasePayload.commentId,
        ownerId: useCasePayload.ownerId,
      })
    );
  });
});
