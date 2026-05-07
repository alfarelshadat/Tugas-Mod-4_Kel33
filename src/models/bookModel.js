import { pool } from '../config/db.js';

export const BookModel = {
  // GET ALL + SEARCH
  async getAll(title) {
    let query = `
      SELECT b.*, a.name as author_name, c.name as category_name 
      FROM books b
      LEFT JOIN authors a ON b.author_id = a.id
      LEFT JOIN categories c ON b.category_id = c.id
    `;

    let values = [];

    if (title) {
      query += ` WHERE b.title ILIKE $1`;
      values.push(`%${title}%`);
    }

    const result = await pool.query(query, values);
    return result.rows;
  },

  // GET BY ID
  async getById(id) {
    const query = `
      SELECT * FROM books WHERE id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  // CREATE
  async create(data) {
    const { isbn, title, author_id, category_id, total_copies } = data;
    const query = `
      INSERT INTO books (isbn, title, author_id, category_id, total_copies, available_copies)
      VALUES ($1, $2, $3, $4, $5, $5) RETURNING *
    `;
    const result = await pool.query(query, [isbn, title, author_id, category_id, total_copies]);
    return result.rows[0];
  },

  // UPDATE
  async update(
  id,
  isbn,
  title,
  author_id,
  category_id,
  total_copies,
  available_copies
) {

  const query = `
    UPDATE books
    SET
      isbn = $1,
      title = $2,
      author_id = $3,
      category_id = $4,
      total_copies = $5,
      available_copies = $6
    WHERE id = $7
    RETURNING *
  `;

  const values = [
    isbn,
    title,
    author_id,
    category_id,
    total_copies,
    available_copies,
    id
  ];

  const result =
    await pool.query(query, values);

  return result.rows[0];

},

async delete(id) {

  await pool.query(
    'DELETE FROM books WHERE id = $1',
    [id]
  );

  return {
    message: 'Book berhasil dihapus'
  };

}
};

