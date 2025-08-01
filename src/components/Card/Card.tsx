import React, { ReactNode, CSSProperties } from 'react';
import './Card.css';

export type CardProps = {
  children: ReactNode;
  shadow?: 'none' | 'small' | 'large';
  borderColor?: string;
  padding?: string;
  className?: string;
  style?: CSSProperties;
};

export const Card = ({
  children,
  shadow = 'small',
  borderColor = '#ddd',
  padding = '1rem',
  className = '',
  style = {},
}: CardProps) => {
  const classes = `card card--shadow-${shadow} ${className}`.trim();

  const combinedStyle: CSSProperties = {
    borderColor,
    padding,
    ...style,
  };

  return (
    <div className={classes} style={combinedStyle}>
      {children}
    </div>
  );
};
