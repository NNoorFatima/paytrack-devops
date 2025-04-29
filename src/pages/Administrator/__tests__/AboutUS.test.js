import React from 'react';
import { render, screen } from '@testing-library/react';
import AboutUs from '../AboutUS';

jest.mock('../../../components/AdminLayout', () => ({ children }) => <div>{children}</div>);

describe('AboutUs Page', () => {
  test('renders About Us page content', () => {
    render(<AboutUs />);
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Our Mission')).toBeInTheDocument();
    expect(screen.getByText('Who We Are')).toBeInTheDocument();
    expect(screen.getByText('Core Values')).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    expect(screen.getByText('Email: contact@company.com')).toBeInTheDocument();
    expect(screen.getByText('Phone: (123) 456-7890')).toBeInTheDocument();
  });
}); 