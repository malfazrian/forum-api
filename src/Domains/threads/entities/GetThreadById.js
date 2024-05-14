class GetThreadById {
  constructor(payload) {
    this._verifyPayload(payload);

    const { threadId } = payload;

    this.threadId = threadId;
  }

  _verifyPayload({ threadId }) {
    if (!threadId) {
      throw new Error("GET_THREAD_BY_ID.NOT_CONTAIN_NEEDED_PROPERTY");
    }
    if (typeof threadId !== "string") {
      throw new Error("GET_THREAD_BY_ID.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}

module.exports = GetThreadById;
