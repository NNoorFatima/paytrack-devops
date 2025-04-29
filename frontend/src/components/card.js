// src/components/ui/card.js

import React from 'react';

export const Card = ({ className, children }) => {
  return <div className={`card ${className}`}>{children}</div>;
};

export const CardHeader = ({ className, children }) => {
  return <div className={`card-header ${className}`}>{children}</div>;
};

export const CardContent = ({ className, children }) => {
  return <div className={`card-content ${className}`}>{children}</div>;
};

export const CardTitle = ({ className, children }) => {
  return <h2 className={`card-title ${className}`}>{children}</h2>;
};

export const CardDescription = ({ className, children }) => {
  return <p className={`card-description ${className}`}>{children}</p>;
};
