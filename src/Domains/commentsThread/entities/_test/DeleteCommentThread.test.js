const DeleteCommentThread = require("../DeleteCommentThread");

describe("DeleteCommentThread entities", () => {
  it("should throw error when payload did not contain needed property", () => {
    // Arrange
    const payload = {
      commentId: "comment-123",
    };

    // Action and Assert
    expect(() => new DeleteCommentThread(payload)).toThrowError(
      "DELETE_COMMENT_THREAD.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload did not meet data type specification", () => {
    // Arrange
    const payload = {
      commentId: 123,
      ownerId: ["John"],
    };

    // Action and Assert
    expect(() => new DeleteCommentThread(payload)).toThrowError(
      "DELETE_COMMENT_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should create DeleteCommentThread object correctly", () => {
    // Arrange
    const payload = {
      commentId: "comment-123",
      ownerId: "user-123",
    };

    // Action
    const { commentId, ownerId } = new DeleteCommentThread(payload);

    // Assert
    expect(commentId).toEqual(payload.commentId);
    expect(ownerId).toEqual(payload.ownerId);
  });
});
