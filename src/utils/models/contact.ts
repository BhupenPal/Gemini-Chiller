import { Schema, model, models } from 'mongoose';

import { IContact } from '../types';

const contactSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      minlength: 2,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
      trim: true,
    },
    views: {
      type: String,
      default: null,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export default models.Contact || model<IContact>('Contact', contactSchema);
