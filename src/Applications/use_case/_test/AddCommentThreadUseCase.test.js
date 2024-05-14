const PostCommentThread = require("../../../Domains/commentsThread/entities/PostCommentThread");
const PostedCommentThread = require("../../../Domains/commentsThread/entities/PostedCommentThread");
const ThreadRepository = require("../../../Domains/threads/ThreadRepository");
const CommentThreadRepository = require("../../../Domains/commentsThread/CommentThreadRepository");
const AddCommentThreadUseCase = require("../AddCommentThreadUseCase");

describe("AddCommentThreadUseCase", () => {
  /**
   * Menguji apakah use case mampu mengoskestrasikan langkah demi langkah dengan benar.
   */
  it("should orchestrating the add comment of thread action correctly", async () => {
    // Arrange
    const useCasePayload = {
      threadId: "thread-123",
      content: "sebuah comment",
      owner: "user-123",
    };

    const mockPostedCommentThread = new PostedCommentThread({
      id: "comment-123",
      content: useCasePayload.content,
      owner: useCasePayload.owner,
    });

    /** Creating dependencies of use case */
    const mockCommentThreadRepository = new CommentThreadRepository();
    const mockThreadRepository = new ThreadRepository();

    /** Mocking needed functions */
    mockThreadRepository.verifyThreadExist = jest.fn().mockResolvedValue();
    mockCommentThreadRepository.addCommentThread = jest
      .fn()
      .mockResolvedValue(mockPostedCommentThread);

    /** Creating use case instance */
    const addCommentUseCase = new AddCommentThreadUseCase({
      commentThreadRepository: mockCommentThreadRepository,
      threadRepository: mockThreadRepository,
    });

    // Action
    const postedCommentThread = await addCommentUseCase.execute(useCasePayload);

    // Assert
    expect(postedCommentThread).toStrictEqual(
      new PostedCommentThread({
        id: "comment-123",
        content: useCasePayload.content,
        owner: useCasePayload.owner,
      })
    );

    expect(mockThreadRepository.verifyThreadExist).toHaveBeenCalledWith(
      useCasePayload.threadId
    );

    expect(mockCommentThreadRepository.addCommentThread).toHaveBeenCalledWith(
      new PostCommentThread({
        threadId: useCasePayload.threadId,
        content: useCasePayload.content,
        owner: useCasePayload.owner,
      })
    );
  });
});
