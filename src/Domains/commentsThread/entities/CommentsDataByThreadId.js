class CommentsDataByThreadId {
  constructor(payloads) {
    if (!Array.isArray(payloads)) {
      // If it's not an array, convert it to an array with a single element
      payloads = [payloads];
    }

    // Check if payloads is an empty array
    if (payloads.length === 0) {
      this.comments = [];
    } else {
      this.comments = payloads.map((payload) => this._createComment(payload));
    }
  }

  _createComment({ id, username, date, is_delete, content }) {
    // Check if all required properties are present
    if (!id || !username || !date || !content) {
      throw new Error("COMMENTS_DATA_BY_THREAD_ID.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    // Verify the data types of the properties
    if (
      typeof id !== "string" ||
      typeof username !== "string" ||
      typeof date !== "string" ||
      typeof content !== "string" ||
      (is_delete !== undefined && typeof is_delete !== "boolean")
    ) {
      throw new Error(
        "COMMENTS_DATA_BY_THREAD_ID.NOT_MEET_DATA_TYPE_SPECIFICATION"
      );
    }

    // Create the comment object
    return { id, username, date, is_delete, content };
  }
}

module.exports = CommentsDataByThreadId;
