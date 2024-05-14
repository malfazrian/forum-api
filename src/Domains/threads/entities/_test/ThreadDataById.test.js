const ThreadDataById = require("../ThreadDataById");

describe("a ThreadDataById entities", () => {
  it("should throw error when payload did not contain needed property", () => {
    // Arrange
    const payload = {
      id: "thread-123",
    };

    // Action and Assert
    expect(() => new ThreadDataById(payload)).toThrowError(
      "THREAD_DATA_BY_ID.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload did not meet data type specification", () => {
    // Arrange
    const payload = {
      id: 123,
      title: "sebuah thread",
      body: "sebuah body thread",
      date: 20210808,
      username: "dicoding",
      comments: [
        {
          id: "comment-_pby2_tmXV6bcvcdev8xk",
          username: "johndoe",
          date: "2021-08-08T07:22:33.555Z",
          content: "sebuah comment",
        },
        {
          id: "comment-yksuCoxM2s4MMrZJO-qVD",
          username: "dicoding",
          date: "2021-08-08T07:26:21.338Z",
          content: "**komentar telah dihapus**",
        },
      ],
    };

    //Action and Assert
    expect(() => new ThreadDataById(payload)).toThrowError(
      "THREAD_DATA_BY_ID.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should create ThreadDataById object correctly", () => {
    // Arrange
    const payload = {
      id: "thread-h_2FkLZhtgBKY2kh4CC02",
      title: "sebuah thread",
      body: "sebuah body thread",
      date: "2021-08-08T07:19:09.775Z",
      username: "dicoding",
      comments: [
        {
          id: "comment-_pby2_tmXV6bcvcdev8xk",
          username: "johndoe",
          date: "2021-08-08T07:22:33.555Z",
          content: "sebuah comment",
        },
        {
          id: "comment-yksuCoxM2s4MMrZJO-qVD",
          username: "dicoding",
          date: "2021-08-08T07:26:21.338Z",
          content: "**komentar telah dihapus**",
        },
      ],
    };

    // Action
    const threadData = new ThreadDataById(payload);

    // Assert
    expect(threadData).toEqual({
      id: payload.id,
      title: payload.title,
      body: payload.body,
      date: payload.date,
      username: payload.username,
      comments: payload.comments.map((comment) => ({
        id: comment.id,
        username: comment.username,
        date: comment.date,
        content: comment.content,
      })),
    });
  });
});
