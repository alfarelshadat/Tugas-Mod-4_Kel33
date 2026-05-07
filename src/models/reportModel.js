import { pool } from '../config/db.js';

export const ReportModel = {
  
  async getTopBooks() {
    const query = `
      SELECT 
        b.id,
        b.title,
        COUNT(l.id) AS total_loans
      FROM loans l
      JOIN books b ON l.book_id = b.id
      GROUP BY b.id, b.title
      ORDER BY total_loans DESC
      LIMIT 2
    `;

    const result = await pool.query(query);
    return result.rows;
  },

  async getStats() {
    const query = `
      SELECT 
        (SELECT COUNT(*) FROM books) AS total_books,
        (SELECT COUNT(*) FROM authors) AS total_authors,
        (SELECT COUNT(*) FROM categories) AS total_categories,
        (SELECT COUNT(*) FROM loans WHERE status='BORROWED') AS active_loans
    `;

    const result = await pool.query(query);
    return result.rows[0];
  }
};
