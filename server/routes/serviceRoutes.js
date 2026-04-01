import express from 'express';
import {
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
} from '../controllers/serviceController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { serviceValidation, validate } from '../middleware/validation.js';

const router = express.Router();

router.route('/')
  .get(getServices)
  .post(protect, admin, serviceValidation, validate, createService);

router.route('/:id')
  .get(getService)
  .put(protect, admin, serviceValidation, validate, updateService)
  .delete(protect, admin, deleteService);

export default router;
