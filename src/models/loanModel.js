import { pool } from '../config/db.js';

export const LoanModel = {
  async createLoan(book_id, member_id, due_date) {
    const query = `
      INSERT INTO loans (book_id, member_id, loan_date, due_date, status)
      VALUES ($1, $2, NOW(), $3, 'active')
      RETURNING *
    `;
    const result = await pool.query(query, [book_id, member_id, due_date]);
    return result.rows[0];
  },

  async getAllLoans() {
    const query = `
      SELECT l.*, b.title, m.name as member_name
      FROM loans l
      JOIN books b ON l.book_id = b.id
      JOIN members m ON l.member_id = m.id
      ORDER BY l.loan_date DESC
    `;
    const result = await pool.query(query);
    return result.rows;
  },

  async returnBook(loan_id) {
    const query = `
      UPDATE loans
      SET status = 'returned', return_date = NOW()
      WHERE id = $1
      RETURNING *
    `;
    const result = await pool.query(query, [loan_id]);
    return result.rows[0];
  },

  async update(
  id,
  member_id,
  book_id,
  borrow_date,
  return_date,
  status
) {

  const query = `
    UPDATE loans
    SET
      member_id = $1,
      book_id = $2,
      borrow_date = $3,
      return_date = $4,
      status = $5
    WHERE id = $6
    RETURNING *
  `;

  const values = [
    member_id,
    book_id,
    borrow_date,
    return_date,
    status,
    id
  ];

  const result =
    await pool.query(query, values);

  return result.rows[0];

},

async delete(id) {

  await pool.query(
    'DELETE FROM loans WHERE id = $1',
    [id]
  );

  return {
    message: 'Loan berhasil dihapus'
  };

}
};
