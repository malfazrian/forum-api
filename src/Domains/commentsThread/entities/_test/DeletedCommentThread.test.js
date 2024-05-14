const DeletedCommentThread = require("../DeletedCommentThread");

describe("a DeletedCommentThread entities", () => {
  it("should throw error when payload did not contain needed property", () => {
    // Arrange
    const payload = {
      message: "komen berhasil dihapus",
    };

    // Action and Assert
    expect(() => new DeletedCommentThread(payload)).toThrowError(
      "DELETED_COMMENT_THREAD.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload did not meet data type specification", () => {
    // Arrange
    const payload = {
      status: 404,
    };

    // Action and Assert
    expect(() => new DeletedCommentThread(payload)).toThrowError(
      "DELETED_COMMENT_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should create DeletedCommentThread object correctly", () => {
    // Arrange
    const payload = {
      status: "success",
    };

    //Action
    const { status } = new DeletedCommentThread(payload);

    // Assert
    expect(status).toEqual(payload.status);
  });
});
