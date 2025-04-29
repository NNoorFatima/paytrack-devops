import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../tabs';

describe('Tabs components', () => {
  test('Tabs renders children and className', () => {
    render(<Tabs className="custom">Tab Content</Tabs>);
    const tabs = screen.getByText('Tab Content');
    expect(tabs).toBeInTheDocument();
    expect(tabs).toHaveClass('tabs custom');
  });

  test('TabsList renders children and className', () => {
    render(<TabsList className="list">List</TabsList>);
    const list = screen.getByText('List');
    expect(list).toBeInTheDocument();
    expect(list).toHaveClass('tabs-list list');
  });

  test('TabsTrigger renders children, className, and handles click', () => {
    const handleClick = jest.fn();
    render(<TabsTrigger className="trigger" onClick={handleClick}>Trigger</TabsTrigger>);
    const trigger = screen.getByText('Trigger');
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveClass('tabs-trigger trigger');
    fireEvent.click(trigger);
    expect(handleClick).toHaveBeenCalled();
  });

  test('TabsContent renders children and className', () => {
    render(<TabsContent className="content">Content</TabsContent>);
    const content = screen.getByText('Content');
    expect(content).toBeInTheDocument();
    expect(content).toHaveClass('tabs-content content');
  });
}); 