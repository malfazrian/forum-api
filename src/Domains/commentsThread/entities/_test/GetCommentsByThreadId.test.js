const GetCommentsByThreadId = require("../GetCommentsByThreadId");

describe("a GetCommentsByThreadId entities", () => {
  it("should throw error when payload did not contain needed property", () => {
    // Arrange
    const payload = {
      commentId: "comment-123",
    };

    // Action and Assert
    expect(() => new GetCommentsByThreadId(payload)).toThrowError(
      "GET_COMMENTS_BY_THREAD_ID.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload did not meet data type specification", () => {
    // Arrange
    const payload = {
      threadId: 123,
    };

    // Action and Assert
    expect(() => new GetCommentsByThreadId(payload)).toThrowError(
      "GET_COMMENTS_BY_THREAD_ID.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should create GetCommentsByThreadId object correctly", () => {
    // Arrange
    const payload = {
      threadId: "thread-123",
    };

    //Action
    const { threadId } = new GetCommentsByThreadId(payload);

    // Assert
    expect(threadId).toEqual(payload.threadId);
  });
});
