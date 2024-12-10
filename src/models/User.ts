import mongoose, { Document, Schema, model } from 'mongoose';

export interface IUser extends Document {
  user_id: string;
  email: string;
  password_hash: string;
  name: string;
  profile_picture?: string;
  role: 'user' | 'admin';
  status: 'active' | 'inactive' | 'suspended';
  created_at: Date;
  updated_at: Date;
}

const userSchema = new Schema<IUser>({
  user_id: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  name: { type: String, required: true },
  profile_picture: { type: String, default: '' },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  status: { type: String, enum: ['active', 'inactive', 'suspended'], default: 'active' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

export default model<IUser>('User', userSchema);
