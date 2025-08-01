import React, { useState, ReactNode } from 'react';
import './Accordion.css';

type AccordionProps = {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
  // Optional: you can add more like `disabled`, or custom styles
};

export const Accordion = ({
  title,
  children,
  defaultOpen = false,
  className = '',
}: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`accordion ${className}`}>
      <button
        className="accordion__button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <span className="accordion__icon">{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && <div className="accordion__content">{children}</div>}
    </div>
  );
};
