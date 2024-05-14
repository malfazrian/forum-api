const GetThreadById = require("../../../Domains/threads/entities/GetThreadById");
const GetCommentsByThreadId = require("../../../Domains/commentsThread/entities/GetCommentsByThreadId"); // Import GetCommentsByThreadId
const ThreadDataById = require("../../../Domains/threads/entities/ThreadDataById");
const ThreadRepository = require("../../../Domains/threads/ThreadRepository");
const CommentThreadRepository = require("../../../Domains/commentsThread/CommentThreadRepository");
const GetThreadByIdUseCase = require("../GetThreadByIdUseCase");

describe("GetThreadByIdUseCase", () => {
  it("should orchestrating the get thread by id action correctly", async () => {
    // Arrange
    const useCasePayload = {
      threadId: "thread-123",
    };

    // Mock thread data and expected thread data
    const mockThreadData = {
      id: "thread-123",
      title: "sebuah judul thread",
      body: "sebuah thread",
      date: "2021-08-08T07:19:09.775Z",
      username: "user-123",
      comments: [],
    };

    const expectedThreadData = {
      id: mockThreadData.id,
      title: mockThreadData.title,
      body: mockThreadData.body,
      date: mockThreadData.date,
      username: mockThreadData.username,
      comments: [
        {
          id: "comment-1",
          username: "user1",
          date: "2024-05-03T12:00:00Z",
          content: "This is a comment",
        },
        {
          id: "comment-2",
          username: "user2",
          date: "2024-05-04T08:00:00Z",
          content: "**komentar telah dihapus**",
        },
      ],
    };

    // Create mock repositories
    const mockThreadRepository = {
      verifyThreadExist: jest.fn(() => Promise.resolve()),
      getThreadById: jest.fn(() => Promise.resolve(mockThreadData)),
    };

    // Mock the case where commentsData is defined and has comments
    const mockCommentThreadRepositoryWithComments = {
      getCommentsByThreadId: jest.fn(() => {
        return {
          comments: [
            {
              id: "comment-1",
              username: "user1",
              date: "2024-05-03T12:00:00Z",
              is_delete: false,
              content: "This is a comment",
            },
            {
              id: "comment-2",
              username: "user2",
              date: "2024-05-04T08:00:00Z",
              is_delete: true,
              content: "This is a comment",
            },
          ],
        };
      }),
    };

    // Mock the case where commentsData is undefined or has no comments
    const mockCommentThreadRepositoryNoComments = {
      getCommentsByThreadId: jest.fn(() => {
        return {
          // Simulate undefined or falsy commentsData
          comments: undefined,
        };
      }),
    };

    // Action and Assert when commentsData has comments
    let getThreadByIdUseCase = new GetThreadByIdUseCase({
      threadRepository: mockThreadRepository,
      commentThreadRepository: mockCommentThreadRepositoryWithComments,
    });

    let threadDataById = await getThreadByIdUseCase.execute(useCasePayload);

    expect(threadDataById).toEqual(expectedThreadData);
    expect(
      mockCommentThreadRepositoryWithComments.getCommentsByThreadId
    ).toHaveBeenCalledWith(new GetCommentsByThreadId(useCasePayload));

    // Action and Assert when commentsData is undefined or has no comments
    getThreadByIdUseCase = new GetThreadByIdUseCase({
      threadRepository: mockThreadRepository,
      commentThreadRepository: mockCommentThreadRepositoryNoComments,
    });

    threadDataById = await getThreadByIdUseCase.execute(useCasePayload);

    // In this case, the expected thread data should be the same as the mockThreadData
    expect(threadDataById).toEqual(mockThreadData);
    expect(
      mockCommentThreadRepositoryNoComments.getCommentsByThreadId
    ).toHaveBeenCalledWith(new GetCommentsByThreadId(useCasePayload));
  });
});
