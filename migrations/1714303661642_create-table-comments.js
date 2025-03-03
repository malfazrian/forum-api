/* eslint-disable camelcase */
exports.up = (pgm) => {
  pgm.createTable("comments", {
    id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
    thread_id: {
      type: "VARCHAR(50)",
      notNull: true,
      references: "threads(id)",
      onDelete: "CASCADE",
    },
    username: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    date: {
      type: "TEXT",
      notNull: true,
    },
    content: {
      type: "TEXT",
      notNull: true,
    },
    is_delete: {
      type: "BOOLEAN",
      notNull: true,
      default: false,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("comments");
};
