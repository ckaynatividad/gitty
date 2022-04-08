const pool = require('../utils/pool');

module.exports = class Post {
  id;
  content;

  constructor(row) {
    this.id = row.id;
    this.content = row.content;
  }

  static getPost() {
    return pool.query('SELECT id, content FROM posts').then(({ rows }) => {
      return rows.map((row) => new Post(row));
    });
  }
  static insert({ content }) {
    return pool
      .query('INSERT INTO posts (content) VALUES ($1) RETURNING *;', [content])
      .then(({ rows }) => {
        return new Post(rows[0]);
      });
  }
};
