import { Document } from 'mongoose';

export interface IAdmin extends Document {
  fullName: string;
  email: string;
  password: string;
  RTexpiresIn: string;
}
