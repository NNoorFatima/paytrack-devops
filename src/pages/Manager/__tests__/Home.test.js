import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../Home';

describe('Manager Home Page', () => {
  test('renders Home page', () => {
    render(<Home />);
    expect(screen.getByText(/Welcome to the Manager Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Here you can manage staff, view reports, and handle leave requests./i)).toBeInTheDocument();
  });
}); 