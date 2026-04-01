import express from 'express';
import {
  submitContact,
  getContacts,
  getContact,
  updateContactStatus,
  deleteContact,
} from '../controllers/contactController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { contactValidation, validate } from '../middleware/validation.js';

const router = express.Router();

router.route('/')
  .post(contactValidation, validate, submitContact)
  .get(protect, admin, getContacts);

router.route('/:id')
  .get(protect, admin, getContact)
  .put(protect, admin, updateContactStatus)
  .delete(protect, admin, deleteContact);

export default router;
