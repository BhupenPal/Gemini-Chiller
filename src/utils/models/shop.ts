import { Schema, model, models } from 'mongoose';

import { IShop } from '../types';

const ShopSchema = new Schema(
  {
    paymentId: {
      type: String,
      required: true,
      minlength: 2,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    payerId: {
      type: String,
      required: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    amountValue: {
      type: String,
      required: true,
      trim: true,
    },
    amountCurrency: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export default models.Shop || model<IShop>('Shop', ShopSchema);
