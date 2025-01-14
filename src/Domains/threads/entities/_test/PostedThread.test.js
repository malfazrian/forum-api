const PostedThread = require("../PostedThread");

describe("a PostedThread entities", () => {
  it("should throw error when payload did not contain needed property", () => {
    // Arrange
    const payload = {
      id: "thread-123",
      title: "title",
    };

    // Action and Assert
    expect(() => new PostedThread(payload)).toThrowError(
      "POSTED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload did not meet data type specification", () => {
    // Arrange
    const payload = {
      id: 123,
      title: true,
      owner: "user-123",
    };

    //Action and Assert
    expect(() => new PostedThread(payload)).toThrowError(
      "POSTED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should create postedThread object correctly", () => {
    // Arrange
    const payload = {
      id: "thread-123",
      title: "title thread",
      owner: "user-123",
    };

    // Action
    const postedThread = new PostedThread(payload);

    // Assert
    expect(postedThread.id).toEqual(payload.id);
    expect(postedThread.title).toEqual(payload.title);
    expect(postedThread.body).toEqual(payload.body);
  });
});
