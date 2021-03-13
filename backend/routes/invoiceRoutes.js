import express from 'express'
const router = express.Router()
import {
  addInvoiceItems, 
  getInvoiceById, 
  getInvoices,
  updateInvoice,
  deleteInvoice,
  getInvoiceByUserId
} from '../controllers/invoiceController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getInvoices)
router.route('/myinvoices').get(protect,getInvoiceByUserId)
router
.route('/:id')
.post(addInvoiceItems)
.put(updateInvoice)
.get(getInvoiceById)
.delete(deleteInvoice)

export default router