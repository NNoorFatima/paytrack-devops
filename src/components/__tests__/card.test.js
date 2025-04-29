import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '../card';

describe('Card components', () => {
  test('Card renders children and className', () => {
    render(<Card className="custom">Card Content</Card>);
    const card = screen.getByText('Card Content');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('card custom');
  });

  test('CardHeader renders children and className', () => {
    render(<CardHeader className="header">Header</CardHeader>);
    const header = screen.getByText('Header');
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass('card-header header');
  });

  test('CardContent renders children and className', () => {
    render(<CardContent className="content">Content</CardContent>);
    const content = screen.getByText('Content');
    expect(content).toBeInTheDocument();
    expect(content).toHaveClass('card-content content');
  });

  test('CardTitle renders children and className', () => {
    render(<CardTitle className="title">Title</CardTitle>);
    const title = screen.getByText('Title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass('card-title title');
  });

  test('CardDescription renders children and className', () => {
    render(<CardDescription className="desc">Description</CardDescription>);
    const desc = screen.getByText('Description');
    expect(desc).toBeInTheDocument();
    expect(desc).toHaveClass('card-description desc');
  });
}); 