const PostThread = require("../../../Domains/threads/entities/PostThread");
const PostedThread = require("../../../Domains/threads/entities/PostedThread");
const ThreadRepository = require("../../../Domains/threads/ThreadRepository");
const AddThreadUseCase = require("../AddThreadUseCase");

describe("AddThreadUseCase", () => {
  /**
   * Menguji apakah use case mampu mengoskestrasikan langkah demi langkah dengan benar.
   */
  it("should orchestrating the add thread action correctly", async () => {
    //Arrange
    const useCasePayload = {
      title: "sebuah judul",
      body: "sebuah thread",
      owner: "user-123",
    };

    const mockPostedThread = new PostedThread({
      id: "thread-123",
      title: useCasePayload.title,
      owner: useCasePayload.owner,
    });

    /**creating dependency of use case */
    const mockThreadRepository = new ThreadRepository();

    /**mocking needed function */
    mockThreadRepository.addThread = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockPostedThread));

    /**creating use case instance */
    const addThreadUseCase = new AddThreadUseCase({
      threadRepository: mockThreadRepository,
    });

    // Action
    const postedThread = await addThreadUseCase.execute(useCasePayload);

    // Assert
    expect(postedThread).toStrictEqual(
      new PostedThread({
        id: "thread-123",
        title: useCasePayload.title,
        owner: useCasePayload.owner,
      })
    );

    expect(mockThreadRepository.addThread).toBeCalledWith(
      new PostThread({
        title: useCasePayload.title,
        body: useCasePayload.body,
        owner: useCasePayload.owner,
      })
    );
  });
});
