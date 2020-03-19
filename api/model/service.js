import mongoose, { Schema } from 'mongoose';
import { accessibleFieldsPlugin, accessibleRecordsPlugin } from '@casl/mongoose';

const Service = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: Number,
  time: Number,
  banner: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  subtype: String,
  addons: [
    {
      name: {
        type: String,
        required: true,
      },
      price: Number,
    },
  ],
});

Service.plugin(accessibleFieldsPlugin);
Service.plugin(accessibleRecordsPlugin);

Service.method('modelName', () => 'Service', { suppressWarning: true });

export default mongoose.model('Service', Service);
