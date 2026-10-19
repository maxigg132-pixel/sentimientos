import React from 'react';

interface CupidHeartProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
}

export const CupidArrowHeart: React.FC<CupidHeartProps> = ({
  className = '',
  size = 'md',
  color = '#E11D48',
}) => {
  const dimensions = {
    sm: { width: 38, height: 26 },
    md: { width: 56, height: 38 },
    lg: { width: 80, height: 54 },
    xl: { width: 104, height: 70 },
  }[size];

  return (
    <div className={`inline-flex items-center justify-center select-none pointer-events-none drop-shadow-sm ${className}`}>
      <svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox="0 0 100 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="cupidHeartGrad" x1="25" y1="15" x2="75" y2="60" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FB7185" />
            <stop offset="0.6" stopColor={color} />
            <stop offset="1" stopColor="#9F1239" />
          </linearGradient>
          <linearGradient id="arrowGoldGrad" x1="5" y1="65" x2="95" y2="5" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FDE047" />
            <stop offset="0.5" stopColor="#EAB308" />
            <stop offset="1" stopColor="#CA8A04" />
          </linearGradient>
        </defs>

        {/* Arrow Tail / Feathers (Bottom Left) */}
        <g stroke="url(#arrowGoldGrad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Arrow shaft entrance */}
          <line x1="8" y1="62" x2="36" y2="44" />
          {/* Feather fletchings */}
          <line x1="12" y1="60" x2="8" y2="53" />
          <line x1="16" y1="57" x2="12" y2="50" />
          <line x1="15" y1="62" x2="21" y2="67" />
          <line x1="19" y1="59" x2="25" y2="64" />
        </g>

        {/* Heart shape */}
        <path
          d="M 50 25 
             C 45 10, 24 10, 22 28 
             C 20 44, 40 56, 50 66 
             C 60 56, 80 44, 78 28 
             C 76 10, 55 10, 50 25 Z"
          fill="url(#cupidHeartGrad)"
          stroke="#BE123C"
          strokeWidth="1.5"
        />

        {/* Heart Gloss / Highlight */}
        <path
          d="M 28 25 C 28 18, 36 16, 42 20"
          stroke="rgba(255, 255, 255, 0.45)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Arrow Head / Tip (Top Right) */}
        <g stroke="url(#arrowGoldGrad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Shaft exit */}
          <line x1="64" y1="26" x2="88" y2="10" />
          {/* Arrow point */}
          <path
            d="M 88 10 L 76 13 M 88 10 L 85 22"
            fill="none"
          />
        </g>
      </svg>
    </div>
  );
};
