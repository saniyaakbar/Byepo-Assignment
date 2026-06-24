import mongoose from 'mongoose';

const featureFlagSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: [true, 'Please provide a feature key'],
      trim: true,
      maxlength: [100, 'Feature key cannot be more than 100 characters'],
    },
    enabled: {
      type: Boolean,
      default: false,
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization',
      required: [true, 'Please provide an organization ID'],
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to ensure unique keys per organization
featureFlagSchema.index({ key: 1, organizationId: 1 }, { unique: true });

export default mongoose.model('FeatureFlag', featureFlagSchema);
