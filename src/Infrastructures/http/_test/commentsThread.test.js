const pool = require("../../database/postgres/pool");
const CommentsTableTestHelper = require("../../../../tests/CommentsThreadTableTestHelper");
const ThreadsTableTestHelper = require("../../../../tests/ThreadsTableTestHelper");
const container = require("../../container");
const createServer = require("../createServer");
const UsersTableTestHelper = require("../../../../tests/UsersTableTestHelper");

describe("/threads/{threadId}/comments endpoint", () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await CommentsTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  describe("when POST /threads/{threadId}/comments", () => {
    it("should add comment to thread and return 201 with added comment", async () => {
      // Arrange
      await ThreadsTableTestHelper.addThread({
        id: "thread-CT123",
      });
      const authToken = ThreadsTableTestHelper.generateValidToken();

      const requestPayload = {
        content: "sebuah komentar",
      };
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: "POST",
        url: `/threads/thread-CT123/comments`,
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      // Assert
      expect(response.statusCode).toEqual(201);
      const responseJson = JSON.parse(response.payload);
      expect(responseJson.status).toEqual("success");
      expect(responseJson.data.addedComment).toBeDefined();
    });

    it("should return 404 when thread is not found", async () => {
      // Arrange
      const authToken = ThreadsTableTestHelper.generateValidToken();
      const nonExistentThreadId = "nonexistent-thread";
      const requestPayload = {
        content: "sebuah komentar",
      };
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: "POST",
        url: `/threads/${nonExistentThreadId}/comments`,
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      // Assert
      expect(response.statusCode).toEqual(404);
      const responseJson = JSON.parse(response.payload);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toBeDefined();
    });
  });

  describe("when DELETE /threads/{threadId}/comments/{commentId}", () => {
    it("should delete comment from thread and return 200 with success message", async () => {
      // Arrange
      const authToken = ThreadsTableTestHelper.generateValidToken();
      await ThreadsTableTestHelper.addThread({ id: "thread-123" });
      await UsersTableTestHelper.addUser({ id: "user-123" });
      await CommentsTableTestHelper.addCommentThread({
        id: "comment-123",
        owner: "user-123",
      });

      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: "DELETE",
        url: `/threads/thread-123/comments/comment-123`,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      // Assert
      expect(response.statusCode).toEqual(200);
      const responseJson = JSON.parse(response.payload);
      expect(responseJson.status).toEqual("success");
    });

    it("should return 403 when user is not the owner of the comment", async () => {
      // Arrange
      const authToken = ThreadsTableTestHelper.generateValidToken();
      await UsersTableTestHelper.addUser({ id: "user-123" });
      await ThreadsTableTestHelper.addThread({ id: "thread-123" });
      await CommentsTableTestHelper.addCommentThread({
        id: "comment-123",
        threadId: "thread-123",
        owner: "user-456",
      });
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: "DELETE",
        url: `/threads/thread-123/comments/comment-123`,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      // Assert
      expect(response.statusCode).toEqual(403);
      const responseJson = JSON.parse(response.payload);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toBeDefined();
    });
  });
});
