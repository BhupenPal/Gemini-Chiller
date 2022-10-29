import { Document } from 'mongoose';

export interface IContact extends Document {
  fullName: string;
  email: string;
  phoneNumber: number;
  views: string;
}
