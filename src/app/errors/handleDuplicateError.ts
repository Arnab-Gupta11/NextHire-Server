/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  TErrorSources,
  TGenericErrorResponse,
} from '../interface/error.interface';

/**
 * Handles MongoDB duplicate key errors and provides a standardized response.
 *
 * @param err - The error object containing information about the duplicate key error
 * @returns A structured error response
 */
const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const statusCode = 409;

  // Extract the duplicate key value from the error message using a regex
  const match = err.message.match(
    /index:.*\sdup key:\s\{.*?['"]([^'"]+)['"].*?\}/,
  );
  const duplicateValue = match && match[1]; // Extracted duplicate value
  const fieldName = err?.keyValue
    ? Object.keys(err.keyValue)[0]
    : 'Unknown field';

  const errorSources: TErrorSources = [
    {
      path: fieldName,
      message: duplicateValue
        ? `The provided value for ${fieldName} already exists. Please choose a different ${fieldName}.`
        : 'Duplicate value detected.',
    },
  ];

  return {
    statusCode,
    message: 'Duplicate Key Error',
    errorSources,
  };
};

export default handleDuplicateError;
