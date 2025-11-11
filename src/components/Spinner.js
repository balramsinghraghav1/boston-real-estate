import React from 'react';

// A simple reusable spinner component
function Spinner({ small }) {
  const size = small ? 'h-5 w-5' : 'h-8 w-8';

  return (
    <div
      className={`animate-spin rounded-full ${size} border-b-2 border-white`}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default Spinner;
