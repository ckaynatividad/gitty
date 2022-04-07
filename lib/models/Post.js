const pool = require('../utils/pool');

module.exports = class Post {
  id;
  content;

  constructor(row) {
    this.id = row.id;
    this.content = row.content;
  }

  static async getPost() {
    return pool.query('SELECT id, content FROM posts').then(({ rows }) => {
      return rows.map((row) => new Post(row));
    });
  }
  static async insert({ content }) {
    const { rows } = await pool.query(
      'INSERT INTO posts (content) VALUES ($1) RETURNING *;',
      [content]
    );
    return new Post(rows[0]);
  }
};
