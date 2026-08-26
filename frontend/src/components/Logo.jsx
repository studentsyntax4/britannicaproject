import React from 'react';

// Scalloped checkerboard logo mark (pink + sage green) matching brand identity
const Logo = ({ size = 44 }) => {
  const cells = [
    ['g', 'p', 'g', 'p'],
    ['p', 'g', 'p', 'g'],
    ['g', 'p', 'g', 'p'],
    ['p', 'g', 'p', 'g'],
  ];
  const P = '#F2C9D1';
  const G = '#7FA06A';
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className="shrink-0">
      <defs>
        <clipPath id="scallopClip">
          <path d="M12 8 q6 -6 12 0 q6 -6 12 0 q6 -6 12 0 q6 -6 12 0 q6 -6 12 0 q6 6 0 12 q6 6 0 12 q6 6 0 12 q6 6 0 12 q-6 6 -12 0 q-6 6 -12 0 q-6 6 -12 0 q-6 6 -12 0 q-6 6 -12 0 q-6 -6 0 -12 q-6 -6 0 -12 q-6 -6 0 -12 q-6 -6 0 -12 Z" />
        </clipPath>
      </defs>
      <g clipPath="url(#scallopClip)">
        {cells.map((row, r) =>
          row.map((c, i) => (
            <rect key={`${r}-${i}`} x={12 + i * 19} y={8 + r * 19} width={19} height={19} fill={c === 'g' ? G : P} />
          ))
        )}
      </g>
    </svg>
  );
};

export default Logo;
