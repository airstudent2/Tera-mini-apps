import React from 'react';

interface AdPlaceholderProps {
  width?: string;
  height?: string;
  label?: string;
  className?: string;
}

export function AdPlaceholder({ width = 'w-full', height = 'h-24', label = 'Advertisement Space', className = '' }: AdPlaceholderProps) {
  return (
    <div className={`flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg text-gray-400 text-sm font-medium ${width} ${height} ${className}`}>
      {label}
    </div>
  );
}
