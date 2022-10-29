import { Document } from 'mongoose';

export interface IShop extends Document {
  paymentId: string;
  email: string;
  payerId: string;
  fullName: string;
  address: string;
  amountCurrency: string;
  amountValue: string;
  quantity: string;
}
