import React from 'react';
import { SyncLoader } from 'react-spinners';

/**
 * LoadingSpinner — reusable centered loading indicator.
 * @param {string} color - Spinner color (default: #00A376)
 * @param {number} size  - Dot size in px (default: 16)
 */
const LoadingSpinner = ({ color = '#00A376', size = 16 }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '200px',
      }}
      role="status"
      aria-label="Memuat..."
    >
      <SyncLoader color={color} size={size} />
    </div>
  );
};

export default LoadingSpinner;
