const CommentsDataByThreadId = require("../CommentsDataByThreadId");

describe("a CommentsDataByThreadId entities", () => {
  it("should throw error when payload did not contain needed property", () => {
    // Arrange
    const payload = {
      id: "comments-123",
      username: "user-123",
      date: "2021-08-08T07:22:33.555Z",
    };

    // Action and Assert
    expect(() => new CommentsDataByThreadId([payload])).toThrowError(
      "COMMENTS_DATA_BY_THREAD_ID.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload did not meet data type specification", () => {
    // Arrange
    const payload = {
      id: 123,
      username: "user-123",
      date: 20210808,
      is_delete: false,
      content: [],
    };

    // Action and Assert
    expect(() => new CommentsDataByThreadId([payload])).toThrowError(
      "COMMENTS_DATA_BY_THREAD_ID.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should create CommentsDataByThreadId object correctly with non-empty payload", () => {
    // Arrange
    const payload = {
      id: "comments-123",
      username: "user-123",
      date: "2021-08-08T07:22:33.555Z",
      is_delete: false,
      content: "sebuah komentar",
    };

    // Action
    const commentsData = new CommentsDataByThreadId([payload]);

    // Assert
    expect(commentsData.comments).toHaveLength(1);
    expect(commentsData.comments[0].id).toEqual(payload.id);
    expect(commentsData.comments[0].username).toEqual(payload.username);
    expect(commentsData.comments[0].date).toEqual(payload.date);
    expect(commentsData.comments[0].is_delete).toEqual(payload.is_delete);
    expect(commentsData.comments[0].content).toEqual(payload.content);
  });

  it("should create CommentsDataByThreadId object correctly with empty payload", () => {
    // Action
    const commentsData = new CommentsDataByThreadId([]);

    // Assert
    expect(commentsData.comments).toHaveLength(0);
  });

  it("should convert single payload into an array", () => {
    // Arrange
    const singlePayload = {
      id: "comments-123",
      username: "user-123",
      date: "2021-08-08T07:22:33.555Z",
      is_delete: false,
      content: "sebuah komentar",
    };

    // Action
    const commentsData = new CommentsDataByThreadId(singlePayload);

    // Assert
    expect(commentsData.comments).toHaveLength(1);
    expect(commentsData.comments[0].id).toEqual(singlePayload.id);
    expect(commentsData.comments[0].username).toEqual(singlePayload.username);
    expect(commentsData.comments[0].date).toEqual(singlePayload.date);
    expect(commentsData.comments[0].is_delete).toEqual(singlePayload.is_delete);
    expect(commentsData.comments[0].content).toEqual(singlePayload.content);
  });
});
