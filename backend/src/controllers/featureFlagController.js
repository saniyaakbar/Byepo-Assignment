import FeatureFlag from '../models/FeatureFlag.js';
import { isValidObjectId } from '../utils/validation.js';

// Admin: Create Feature Flag
export const createFeatureFlag = async (req, res, next) => {
  try {
    const { key, enabled } = req.body;
    const organizationId = req.user.organizationId;

    if (!key) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a feature key',
      });
    }

    // Check if feature flag already exists for this org
    const existingFlag = await FeatureFlag.findOne({
      key,
      organizationId,
    });

    if (existingFlag) {
      return res.status(400).json({
        success: false,
        message: 'Feature flag already exists for this organization',
      });
    }

    const featureFlag = await FeatureFlag.create({
      key,
      enabled: enabled || false,
      organizationId,
    });

    res.status(201).json({
      success: true,
      data: featureFlag,
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Toggle Feature Flag
export const toggleFeatureFlag = async (req, res, next) => {
  try {
    const { flagId } = req.params;
    const { enabled } = req.body;
    const organizationId = req.user.organizationId;

    // Validate flagId format
    if (!isValidObjectId(flagId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid flag ID',
      });
    }

    const featureFlag = await FeatureFlag.findById(flagId);

    if (!featureFlag) {
      return res.status(404).json({
        success: false,
        message: 'Feature flag not found',
      });
    }

    // Ensure the flag belongs to the user's organization
    if (featureFlag.organizationId.toString() !== organizationId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this feature flag',
      });
    }

    featureFlag.enabled = enabled;
    await featureFlag.save();

    res.status(200).json({
      success: true,
      data: featureFlag,
    });
  } catch (error) {
    next(error);
  }
};

// Admin: List Feature Flags
export const listFeatureFlags = async (req, res, next) => {
  try {
    const organizationId = req.user.organizationId;

    const featureFlags = await FeatureFlag.find({ organizationId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: featureFlags.length,
      data: featureFlags,
    });
  } catch (error) {
    next(error);
  }
};

// End User: Check Feature Flag Status
export const checkFeatureFlag = async (req, res, next) => {
  try {
    const { organizationId, featureKey } = req.body;

    if (!organizationId || !featureKey) {
      return res.status(400).json({
        success: false,
        message: 'Please provide organization ID and feature key',
      });
    }

    // Validate organizationId format
    if (!isValidObjectId(organizationId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid organization ID',
      });
    }

    const featureFlag = await FeatureFlag.findOne({
      key: featureKey,
      organizationId,
    });

    if (!featureFlag) {
      // Feature flag doesn't exist, consider it disabled
      return res.status(200).json({
        success: true,
        enabled: false,
        message: 'Feature not found',
      });
    }

    res.status(200).json({
      success: true,
      enabled: featureFlag.enabled,
    });
  } catch (error) {
    next(error);
  }
};
