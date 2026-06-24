import mongoose from 'mongoose';

const organizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide an organization name'],
      trim: true,
      maxlength: [100, 'Organization name cannot be more than 100 characters'],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Organization', organizationSchema);
