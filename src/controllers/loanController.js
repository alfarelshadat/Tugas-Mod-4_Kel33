import { LoanModel } from '../models/loanModel.js';

export const LoanController = {
  async createLoan(req, res) {
    const { book_id, member_id, due_date } = req.body;
    try {
      const loan = await LoanModel.createLoan(book_id, member_id, due_date);
      res.status(201).json({
        message: "Peminjaman berhasil dicatat!",
        data: loan
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async getLoans(req, res) {
    try {
      const loans = await LoanModel.getAllLoans();
      res.json(loans);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }, 

  async returnBook(req, res) {
    try {
      const result = await LoanModel.returnBook(req.params.id);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async updateLoan(req, res) {

  try {

    const {
      member_id,
      book_id,
      borrow_date,
      return_date,
      status
    } = req.body;

    const loan =
      await LoanModel.update(
        req.params.id,
        member_id,
        book_id,
        borrow_date,
        return_date,
        status
      );

    res.json(loan);

  } catch (err) {

    res.status(400).json({
      error: err.message
    });

  }

},

async deleteLoan(req, res) {

  try {

    const result =
      await LoanModel.delete(
        req.params.id
      );

    res.json(result);

  } catch (err) {

    res.status(400).json({
      error: err.message
    });

  }

}
};

