
import React from 'react';
import { useTheme } from '../../hooks/useTheme';

export const NextjsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const { theme } = useTheme();
  return (
    <svg viewBox="0 0 128 128" {...props}>
      <circle cx="64" cy="64" r="64" fill={theme === 'dark' ? 'white' : 'black'}></circle>
      <path
        d="M82.112 42.846L54.743 85.154H98.924V98.923H29.077V89.13L68.258 42.846H29.077V29.077H98.924V38.87L82.112 42.846Z"
        fill={theme === 'dark' ? 'black' : 'white'}
      ></path>
    </svg>
  );
};
