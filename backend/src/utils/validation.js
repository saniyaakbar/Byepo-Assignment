import { Types } from 'mongoose';

/**
 * Validate if a string is a valid MongoDB ObjectId
 * @param {string} id - The ID to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const isValidObjectId = (id) => {
  if (!id || typeof id !== 'string') {
    return false;
  }
  return Types.ObjectId.isValid(id);
};

/**
 * Safe error message formatter
 * Returns user-friendly messages without exposing backend details
 * @param {Error} error - The error object
 * @returns {string} - User-friendly error message
 */
export const getErrorMessage = (error) => {
  // CastError - typically invalid ObjectId
  if (error.name === 'CastError') {
    return 'Invalid request parameters';
  }

  // Duplicate key error
  if (error.code === 11000) {
    return 'This record already exists';
  }

  // Validation error
  if (error.name === 'ValidationError') {
    return 'Invalid data provided';
  }

  // Generic catch-all
  return 'Something went wrong';
};
