import React from 'react';
import { useLocation } from 'react-router-dom';

function OutputPage() {
  const location = useLocation();
  const { text } = location.state || { text: "No text provided" };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Output Text</h2>
      <p className="border p-4 rounded">{text}</p>
    </div>
  );
}

export default OutputPage;
