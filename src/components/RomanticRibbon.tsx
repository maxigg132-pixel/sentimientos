import React from 'react';

interface RibbonProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export const RibbonBow: React.FC<RibbonProps> = ({ 
  className = '', 
  size = 'md',
  color = '#F472B6' 
}) => {
  const dimensions = {
    sm: { width: 36, height: 26 },
    md: { width: 54, height: 38 },
    lg: { width: 72, height: 50 },
  }[size];

  return (
    <div className={`inline-flex items-center justify-center filter drop-shadow-sm select-none pointer-events-none ${className}`}>
      <svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox="0 0 100 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left Loop */}
        <path
          d="M 50 25 C 35 5, 8 10, 14 35 C 18 46, 38 38, 50 30"
          fill="url(#ribbonGradPink)"
          stroke="#E5A0B8"
          strokeWidth="1.2"
        />
        {/* Left Loop Inner Shadow */}
        <path
          d="M 45 27 C 32 15, 18 18, 22 34 C 25 40, 38 34, 45 30"
          fill="#EDB0C5"
          opacity="0.6"
        />

        {/* Right Loop */}
        <path
          d="M 50 25 C 65 5, 92 10, 86 35 C 82 46, 62 38, 50 30"
          fill="url(#ribbonGradPink)"
          stroke="#E5A0B8"
          strokeWidth="1.2"
        />
        {/* Right Loop Inner Shadow */}
        <path
          d="M 55 27 C 68 15, 82 18, 78 34 C 75 40, 62 34, 55 30"
          fill="#EDB0C5"
          opacity="0.6"
        />

        {/* Left Streamer / Ribbon Tail */}
        <path
          d="M 46 32 C 40 45, 30 55, 18 66 C 24 64, 32 60, 36 67 C 42 56, 46 44, 48 34 Z"
          fill="url(#ribbonGradTail)"
          stroke="#E5A0B8"
          strokeWidth="1"
        />

        {/* Right Streamer / Ribbon Tail */}
        <path
          d="M 54 32 C 60 45, 70 55, 82 66 C 76 64, 68 60, 64 67 C 58 56, 54 44, 52 34 Z"
          fill="url(#ribbonGradTail)"
          stroke="#E5A0B8"
          strokeWidth="1"
        />

        {/* Central Knot */}
        <ellipse
          cx="50"
          cy="28"
          rx="7"
          ry="6"
          fill="url(#knotGrad)"
          stroke="#D48B9F"
          strokeWidth="1.2"
        />
        {/* Gold knot accent */}
        <path
          d="M 48 26 C 50 24, 52 24, 53 26"
          stroke="#F6D58E"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        <defs>
          <linearGradient id="ribbonGradPink" x1="10" y1="10" x2="90" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FDE2EC" />
            <stop offset="0.5" stopColor={color} />
            <stop offset="1" stopColor="#F9A8D4" />
          </linearGradient>
          <linearGradient id="ribbonGradTail" x1="20" y1="35" x2="80" y2="70" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F472B6" />
            <stop offset="0.8" stopColor="#FB7185" />
            <stop offset="1" stopColor="#FDA4AF" />
          </linearGradient>
          <linearGradient id="knotGrad" x1="45" y1="22" x2="55" y2="34" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FDF2F8" />
            <stop offset="0.6" stopColor="#F472B6" />
            <stop offset="1" stopColor="#DB2777" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
