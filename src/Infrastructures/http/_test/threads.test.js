const pool = require("../../database/postgres/pool");
const ThreadsTableTestHelper = require("../../../../tests/ThreadsTableTestHelper");
const CommentsTableTestHelper = require("../../../../tests/CommentsThreadTableTestHelper");
const UsersTableTestHelper = require("../../../../tests/UsersTableTestHelper");
const container = require("../../container");
const createServer = require("../createServer");

describe("/threads endpoint", () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await ThreadsTableTestHelper.cleanTable();
    await CommentsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  describe("when POST /threads", () => {
    it("should response 201 and persisted thread", async () => {
      // Arrange
      const requestPayload = {
        title: "sebuah judul thread",
        body: "sebuah isi thread",
        owner: "user-123",
      };
      const authToken = await ThreadsTableTestHelper.generateValidToken();
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: "POST",
        url: "/threads",
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual("success");
      expect(responseJson.data.addedThread).toBeDefined();
    });

    it("should response 401 when user unauthorized", async () => {
      // Arrange
      const requestPayload = {
        title: "sebuah judul thread",
        body: "sebuah isi thread",
        owner: "user-123",
      };
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: "POST",
        url: "/threads",
        payload: requestPayload,
      });

      // Assert
      expect(response.statusCode).toEqual(401);
      const responseJson = JSON.parse(response.payload);
      expect(responseJson.message).toEqual("Missing authentication");
    });

    it("should response 400 when request payload not contain needed property", async () => {
      // Arrange
      const requestPayload = {
        title: "sebuah judul thread",
        owner: "user-123",
      };
      const server = await createServer(container);
      const authToken = await ThreadsTableTestHelper.generateValidToken();

      // Action
      const response = await server.inject({
        method: "POST",
        url: "/threads",
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual(
        "tidak dapat membuat thread baru karena properti yang dibutuhkan tidak ada"
      );
    });

    it("should response 400 when request payload not meet data type specification", async () => {
      // Arrange
      const requestPayload = {
        title: 123,
        body: [],
        owner: "user-123",
      };
      const authToken = await ThreadsTableTestHelper.generateValidToken();
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: "POST",
        url: "/threads",
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual(
        "tidak dapat membuat thread baru karena tipe data tidak sesuai"
      );
    });
  });

  describe("when GET /threads/{threadId}", () => {
    it("should response 200 and return thread details with comments", async () => {
      // Arrange
      // Add users
      const userPayload1 = {
        username: "dicoding2",
        password: "secret",
        fullname: "Dicoding Indonesia",
      };
      const userPayload2 = {
        username: "ryan",
        password: "secret",
        fullname: "Alfazrian",
      };

      const server = await createServer(container);

      await server.inject({
        method: "POST",
        url: "/users",
        payload: userPayload1,
      });

      await server.inject({
        method: "POST",
        url: "/users",
        payload: userPayload2,
      });

      // Users login
      const loginPayload1 = {
        username: "dicoding2",
        password: "secret",
      };
      const loginPayload2 = {
        username: "ryan",
        password: "secret",
      };

      const authResponse1 = await server.inject({
        method: "POST",
        url: "/authentications",
        payload: loginPayload1,
      });

      const authResponse2 = await server.inject({
        method: "POST",
        url: "/authentications",
        payload: loginPayload2,
      });

      const authToken1 = authResponse1.result.data.accessToken;
      const authToken2 = authResponse2.result.data.accessToken;

      // Add thread
      const threadResponse = await server.inject({
        method: "POST",
        url: "/threads",
        payload: {
          title: "sebuah judul thread",
          body: "sebuah isi thread",
        },
        headers: {
          Authorization: `Bearer ${authToken1}`,
        },
      });

      const threadId = threadResponse.result.data.addedThread.id;

      // Add comments
      await server.inject({
        method: "POST",
        url: `/threads/${threadId}/comments`,
        payload: {
          content: "sebuah komentar Ryan",
        },
        headers: {
          Authorization: `Bearer ${authToken2}`,
        },
      });

      await server.inject({
        method: "POST",
        url: `/threads/${threadId}/comments`,
        payload: {
          content: "sebuah komentar Dicoding",
        },
        headers: {
          Authorization: `Bearer ${authToken1}`,
        },
      });

      // Action
      const response = await server.inject({
        method: "GET",
        url: `/threads/${threadId}`,
      });

      // Assert
      expect(response.statusCode).toEqual(200);
      const responseJson = JSON.parse(response.payload);
      expect(responseJson.status).toEqual("success");
      expect(responseJson.data.thread.id).toEqual(threadId);
      expect(responseJson.data.thread.comments.length).toEqual(2);
    });

    it("should response 404 when thread not found", async () => {
      // Arrange
      const nonExistentThreadId = "nonexistent-thread";
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: "GET",
        url: `/threads/${nonExistentThreadId}`,
      });

      // Assert
      expect(response.statusCode).toEqual(404);
      const responseJson = JSON.parse(response.payload);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual("thread tidak ditemukan");
    });
  });
});
