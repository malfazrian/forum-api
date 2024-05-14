class DeletedCommentThread {
  constructor(payload) {
    this._verifyPayload(payload);

    const { status } = payload;

    this.status = status;
  }

  _verifyPayload({ status }) {
    if (!status) {
      throw new Error("DELETED_COMMENT_THREAD.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (typeof status !== "string") {
      throw new Error(
        "DELETED_COMMENT_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION"
      );
    }
  }
}

module.exports = DeletedCommentThread;
