// src/components/ui/tabs.js
import React from "react";

export const Tabs = ({ children, className }) => {
  return <div className={`tabs ${className}`}>{children}</div>;
};

export const TabsList = ({ children, className }) => {
  return <div className={`tabs-list ${className}`}>{children}</div>;
};

export const TabsTrigger = ({ children, className, onClick }) => {
  return (
    <button
      className={`tabs-trigger ${className}`}
      onClick={onClick}  // Ensure onClick triggers tab switching
    >
      {children}
    </button>
  );
};

export const TabsContent = ({ children, className }) => {
  return <div className={`tabs-content ${className}`}>{children}</div>;
};
