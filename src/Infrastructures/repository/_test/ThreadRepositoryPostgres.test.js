const ThreadsTableTestHelper = require("../../../../tests/ThreadsTableTestHelper");
const CommentsThreadTableTestHelper = require("../../../../tests/CommentsThreadTableTestHelper");
const NotFoundError = require("../../../Commons/exceptions/NotFoundError");
const PostThread = require("../../../Domains/threads/entities/PostThread");
const PostedThread = require("../../../Domains/threads/entities/PostedThread");
const pool = require("../../database/postgres/pool");
const ThreadRepositoryPostgres = require("../ThreadRepositoryPostgres");

describe("ThreadRepositoryPostgres", () => {
  afterEach(async () => {
    await ThreadsTableTestHelper.cleanTable();
    await CommentsThreadTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe("verifyThreadExist function", () => {
    it("should throw NotFoundError when thread not exist", async () => {
      // Arrange
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(
        threadRepositoryPostgres.verifyThreadExist("thread-doesnt_exist")
      ).rejects.toThrowError(NotFoundError);
    });

    it("should not throw NotFoundError when thread exist", async () => {
      // Arrange
      const fakeIdGenerator = () => "123"; // stub
      await ThreadsTableTestHelper.addThread({
        id: "thread-123",
        title: "sebuah judul",
        body: "sebuah thread",
        owner: "user-123",
      });
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // Action & Assert
      await expect(
        threadRepositoryPostgres.verifyThreadExist("thread-123")
      ).resolves.not.toThrowError(NotFoundError);
    });
  });

  describe("addThread function", () => {
    it("should persist post thread", async () => {
      // Arrange
      const postThread = new PostThread({
        title: "sebuah judul",
        body: "sebuah thread",
        owner: "user-123",
      });
      const fakeIdGenerator = () => "123"; // stub
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // Action
      await threadRepositoryPostgres.addThread(postThread);

      // Assert
      const thread = await ThreadsTableTestHelper.getThreadById("thread-123");
      expect(thread).toHaveLength(1);
    });

    it("should return posted thread correctly", async () => {
      // Arrange
      const postThread = new PostThread({
        title: "sebuah judul",
        body: "sebuah isi thread",
        owner: "user-123",
      });
      const fakeIdGenerator = () => "123"; // stub
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // Action
      const postedThread = await threadRepositoryPostgres.addThread(postThread);

      // Assert
      expect(postedThread).toStrictEqual(
        new PostedThread({
          id: "thread-123",
          title: "sebuah judul",
          owner: "user-123",
        })
      );
    });
  });

  describe("getThreadById function", () => {
    it("should return NotFoundError when thread not found", async () => {
      // Arrange
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});
      const nonExistingThreadId = "thread-doesnt_exist";

      // Action & Assert
      await expect(
        threadRepositoryPostgres.getThreadById({
          threadId: nonExistingThreadId,
        })
      ).rejects.toThrowError(NotFoundError);
    });
  });
});
