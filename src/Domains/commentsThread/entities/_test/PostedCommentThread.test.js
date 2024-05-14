const PostedCommentThread = require("../PostedCommentThread");

describe("a PostedCommentThread entities", () => {
  it("should throw error when payload did not contain needed property", () => {
    // Arrange
    const payload = {
      content: "abc",
      owner: "abc",
    };

    // Action and Assert
    expect(() => new PostedCommentThread(payload)).toThrowError(
      "POSTED_COMMENT_THREAD.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload did not meet data type specification", () => {
    // Arrange
    const payload = {
      id: "comment-123",
      content: 123,
      owner: true,
    };

    // Action and Assert
    expect(() => new PostedCommentThread(payload)).toThrowError(
      "POSTED_COMMENT_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should create PostedCommentThread object correctly", () => {
    // Arrange
    const payload = {
      id: "comment-123",
      content: "content",
      owner: "userId",
    };

    //Action
    const { id, content, owner } = new PostedCommentThread(payload);

    // Assert
    expect(id).toEqual(payload.id);
    expect(content).toEqual(payload.content);
    expect(owner).toEqual(payload.owner);
  });
});
