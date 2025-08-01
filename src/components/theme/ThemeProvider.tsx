import React, { useEffect, ReactNode } from 'react';
import './theme.css';

type Theme = Record<string, string>;

type Props = {
  theme?: Theme;
  children: ReactNode;
};

export const ThemeProvider = ({ theme = {}, children }: Props) => {
  useEffect(() => {
    Object.entries(theme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}`, value);
    });
  }, [theme]);

  return <>{children}</>;
};
