class DeleteCommentThread {
  constructor(payload) {
    this._verifyPayload(payload);

    const { commentId, ownerId } = payload;

    this.commentId = commentId;
    this.ownerId = ownerId;
  }

  _verifyPayload({ commentId, ownerId }) {
    if (!commentId || !ownerId) {
      throw new Error("DELETE_COMMENT_THREAD.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (typeof commentId !== "string" || typeof ownerId !== "string") {
      throw new Error("DELETE_COMMENT_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}

module.exports = DeleteCommentThread;
