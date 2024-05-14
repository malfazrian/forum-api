const GetThreadById = require("../GetThreadById");

describe("a GetThreadById entities", () => {
  it("should throw error when payload did not contain needed property", () => {
    // Arrange
    const payload = {
      title: "abc",
    };

    // Action and Assert
    expect(() => new GetThreadById(payload)).toThrowError(
      "GET_THREAD_BY_ID.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload did not meet data type specification", () => {
    // Arrange
    const payload = {
      threadId: 123,
    };

    // Action and Assert
    expect(() => new GetThreadById(payload)).toThrowError(
      "GET_THREAD_BY_ID.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should create getThreadById object correctly", () => {
    // Arrange
    const payload = {
      threadId: "thread-123",
    };

    //Action
    const { threadId } = new GetThreadById(payload);

    // Assert
    expect(threadId).toEqual(payload.threadId);
  });
});
