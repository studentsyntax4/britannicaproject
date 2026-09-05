import React from 'react';

// Tarri and Treacle brand mark: a warm brown roundel with an orange (santra) slice.
const Logo = ({ size = 44 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className="shrink-0">
      <circle cx="50" cy="50" r="48" fill="#3E2417" />
      <circle cx="50" cy="50" r="44" fill="none" stroke="#C8641E" strokeWidth="2.5" />
      {/* orange slice */}
      <circle cx="50" cy="50" r="31" fill="#F2A65A" />
      <circle cx="50" cy="50" r="31" fill="none" stroke="#FBEAD2" strokeWidth="4" />
      <circle cx="50" cy="50" r="25" fill="#EE9642" />
      <g stroke="#FBEAD2" strokeWidth="2" strokeLinecap="round">
        <line x1="50" y1="50" x2="50" y2="27" />
        <line x1="50" y1="50" x2="70" y2="38" />
        <line x1="50" y1="50" x2="70" y2="62" />
        <line x1="50" y1="50" x2="50" y2="73" />
        <line x1="50" y1="50" x2="30" y2="62" />
        <line x1="50" y1="50" x2="30" y2="38" />
      </g>
      <circle cx="50" cy="50" r="4" fill="#FBEAD2" />
    </svg>
  );
};

export default Logo;
