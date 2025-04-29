import React from 'react';
import { render, screen } from '@testing-library/react';
import { Badge } from '../badge';

describe('Badge', () => {
  test('renders children correctly', () => {
    render(<Badge>Test Badge</Badge>);
    expect(screen.getByText('Test Badge')).toBeInTheDocument();
  });

  test('applies className prop', () => {
    render(<Badge className="custom-class">Badge</Badge>);
    const badge = screen.getByText('Badge');
    expect(badge).toHaveClass('badge custom-class');
  });
}); 