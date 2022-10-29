import { Schema, model, models } from 'mongoose';
import * as argon from 'argon2';

import { IAdmin } from '../types';

const adminSchema = new Schema(
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
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    RTexpiresIn: {
      type: String,
      default: null,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

adminSchema.index({ email: 1 });

adminSchema.pre<IAdmin>('save', async function preSave(next) {
  try {
    // this is reference to current user document
    const _ = this;
    if ((_.isNew && _.password) || _.isModified('password')) {
      const hash = await argon.hash(_.password);
      _.password = hash;
      return next();
    }
    return next();
  } catch (error) {
    return next();
  }
});

export default models.Admin || model<IAdmin>('Admin', adminSchema);
