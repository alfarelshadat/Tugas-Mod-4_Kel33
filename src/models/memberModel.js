import { pool } from '../config/db.js';

export const MemberModel = {
  async getAll() {
    const result = await pool.query('SELECT * FROM members ORDER BY joined_at DESC');
    return result.rows;
  },

  async create(data) {
    const { full_name, email, member_type } = data;
    const query = `
      INSERT INTO members (full_name, email, member_type) 
      VALUES ($1, $2, $3) RETURNING *
    `;
    const result = await pool.query(query, [full_name, email, member_type]);
    return result.rows[0];
  },

  async update(id, name, email) {

  const query = `
    UPDATE members
    SET
      name = $1,
      email = $2
    WHERE id = $3
    RETURNING *
  `;

  const result =
    await pool.query(
      query,
      [name, email, id]
    );

  return result.rows[0];

},

async delete(id) {

  await pool.query(
    'DELETE FROM members WHERE id = $1',
    [id]
  );

  return {
    message: 'Member berhasil dihapus'
  };

}
};
