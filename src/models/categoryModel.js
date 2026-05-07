import { pool } from '../config/db.js';

export const CategoryModel = {
  async getAll(name) {
    let query = 'SELECT * FROM categories';
    let values = [];

    if (name) {
      query += ' WHERE name ILIKE $1';
      values.push(`%${name}%`);
    }

    query += ' ORDER BY name ASC';

    const result = await pool.query(query, values);
    return result.rows;
  },

  async create(name) {
    const query = 'INSERT INTO categories (name) VALUES ($1) RETURNING *';
    const result = await pool.query(query, [name]);
    return result.rows[0];
  }
};
