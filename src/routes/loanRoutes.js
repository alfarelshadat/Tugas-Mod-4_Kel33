import express from 'express';
import { LoanController } from '../controllers/loanController.js';

const router = express.Router();

router.get('/', LoanController.getLoans);
router.post('/', LoanController.createLoan);
router.post('/:id/return', LoanController.returnBook);
router.put('/:id', LoanController.updateLoan);
router.delete('/:id', LoanController.deleteLoan);
export default router;
