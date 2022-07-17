import { Schema } from 'mongoose';
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';

import { mongoose }  from '../../config/database';

export interface ITask {
  title: string;
  description?: string;
  categories?: string[];
  status: string;
  owner: Schema.Types.ObjectId;
  is_archived: boolean;

  created_at?: Date;
  updated_at?: Date;
}

function statusValidation (value: string): Boolean {
  const types = ['pending', 'completed', 'archived'];
  return types.includes(value);
}

const TaskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String, required: false },
  categories: { type: [String], required: false },
  status: { type: String, default: 'pending', validate: { validator: statusValidation }},
  owner: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  is_archived: { type: Boolean, default: false }
}, {
  versionKey: false,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

TaskSchema.plugin(mongoosePagination);

const Task: Pagination<ITask> = mongoose.model<ITask, Pagination<ITask>>('Task', TaskSchema);

export { Task };