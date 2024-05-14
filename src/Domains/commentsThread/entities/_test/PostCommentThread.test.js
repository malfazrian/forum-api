const PostCommentThread = require("../PostCommentThread");

describe("a PostCommentThread entities", () => {
  it("should throw error when payload did not contain needed property", () => {
    // Arrange
    const payload = {
      threadId: "thread-123",
      content: "abc",
    };

    // Action and Assert
    expect(() => new PostCommentThread(payload)).toThrowError(
      "POST_COMMENT_THREAD.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload did not meet data type specification", () => {
    // Arrange
    const payload = {
      threadId: "thread-123",
      content: 123,
      owner: ["John"],
    };

    // Action and Assert
    expect(() => new PostCommentThread(payload)).toThrowError(
      "POST_COMMENT_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should create PostCommentThread object correctly", () => {
    // Arrange
    const payload = {
      threadId: "thread-123",
      content: "This is awesome",
      owner: "John",
    };

    //Action
    const { threadId, content, owner } = new PostCommentThread(payload);

    // Assert
    expect(threadId).toEqual(payload.threadId);
    expect(content).toEqual(payload.content);
    expect(owner).toEqual(payload.owner);
  });
});
