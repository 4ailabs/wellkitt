
import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <div className="w-16 h-16 border-4 border-brand-green-200 border-t-brand-green-600 rounded-full animate-spin"></div>
      <p className="text-brand-green-800 font-medium">Analizando tus necesidades...</p>
    </div>
  );
};

export default Spinner;
