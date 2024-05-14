const AddCommentThreadUseCase = require("../../../../Applications/use_case/AddCommentThreadUseCase");
const DeleteCommentThreadUseCase = require("../../../../Applications/use_case/DeleteCommentThreadUseCase");

class CommentsThreadHandler {
  constructor(container) {
    this._container = container;

    this.postCommentThreadHandler = this.postCommentThreadHandler.bind(this);
    this.deleteCommentThreadHandler =
      this.deleteCommentThreadHandler.bind(this);
  }

  async postCommentThreadHandler(request, h) {
    const { content } = request.payload;
    const { threadId } = request.params;
    const { id } = request.auth.credentials;

    const payload = {
      threadId: threadId,
      content: content,
      owner: id,
    };
    const addCommentThreadUseCase = this._container.getInstance(
      AddCommentThreadUseCase.name
    );
    const addedComment = await addCommentThreadUseCase.execute(payload);

    const response = h.response({
      status: "success",
      data: {
        addedComment,
      },
    });
    response.code(201);
    return response;
  }

  async deleteCommentThreadHandler(request, h) {
    const deleteCommentThreadUseCase = this._container.getInstance(
      DeleteCommentThreadUseCase.name
    );
    const deleteComment = {
      commentId: request.params.commentId,
      ownerId: request.auth.credentials.id,
    };

    await deleteCommentThreadUseCase.execute(deleteComment);

    const response = h.response({
      status: "success",
    });
    response.code(200);
    return response;
  }
}

module.exports = CommentsThreadHandler;
