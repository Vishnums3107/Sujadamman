import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a service title'],
      trim: true,
      maxlength: [120, 'Service title cannot exceed 120 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a service description'],
      trim: true,
      maxlength: [500, 'Service description cannot exceed 500 characters'],
    },
    icon: {
      type: String,
      required: [true, 'Please provide a service icon'],
      trim: true,
      maxlength: [50, 'Service icon cannot exceed 50 characters'],
    },
    division: {
      type: String,
      required: [true, 'Please provide a division'],
      enum: ['Furniture', 'Home Essentials', 'Business'],
      default: 'Furniture',
    },
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.model('Service', serviceSchema);

export default Service;
