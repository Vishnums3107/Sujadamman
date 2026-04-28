import express from 'express';
import {
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
  uploadServiceImage,
} from '../controllers/serviceController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { serviceValidation, validate } from '../middleware/validation.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getServices)
  .post(protect, admin, serviceValidation, validate, createService);

router.route('/:id')
  .get(getService)
  .put(protect, admin, serviceValidation, validate, updateService)
  .delete(protect, admin, deleteService);

router.post('/:id/image', protect, admin, upload.single('image'), uploadServiceImage);

export default router;
