import { Schema } from 'mongoose';
import { hash } from 'bcrypt';
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';

import { mongoose }  from '../../config/database';

export interface IUser {
  name: string;
  lastname?: string;
  email: string;
  is_admin: boolean;
  password?: string;
  created_at?: Date;
  updated_at?: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  lastname: { type: String, required: false },
  email: { type: String, required: true, unique: true, lowercase: true },
  is_admin: { type: Boolean, required: true, default: false },
  password: { type: String, required: true, select: false }
}, {
  versionKey: false,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

UserSchema.pre('save', async function(next) {
  try {
    const pass_hash = await hash(this.password || '', 10);
    this.password = pass_hash;
    next();
  } catch (error) {
    console.log(`Model: User -> UserSchema.pre('save')`);
    console.log('Error\n', error);
  }
});

UserSchema.plugin(mongoosePagination);

const User: Pagination<IUser> = mongoose.model<IUser, Pagination<IUser>>('User', UserSchema);

export { User };