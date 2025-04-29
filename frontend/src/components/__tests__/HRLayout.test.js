import React from 'react';
import { render, screen } from '@testing-library/react';
import HRLayout from '../HRLayout';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  Link: ({ children, to, className, 'data-testid': dataTestId }) => (
    <a href={to} className={className} data-testid={dataTestId}>
      {children}
    </a>
  ),
  Outlet: () => <div data-testid="outlet">Outlet</div>,
}));

// Mock the HRSidebar component
jest.mock('../HRSidebar', () => {
  return function MockHRSidebar() {
    return <div data-testid="hr-sidebar">Sidebar</div>;
  };
});

describe('HRLayout Component', () => {
  test('renders HR layout with sidebar and content', () => {
    render(
      <HRLayout>
        <div>Test Content</div>
      </HRLayout>
    );
    
    // Check if layout is rendered
    expect(screen.getByTestId('hr-dashboard-container')).toBeInTheDocument();
    
    // Check if sidebar is rendered
    expect(screen.getByTestId('hr-sidebar')).toBeInTheDocument();
    
    // Check if content is rendered
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  test('renders logout link', () => {
    render(
      <HRLayout>
        <div>Test Content</div>
      </HRLayout>
    );
    
    // Check if logout link is rendered
    const logoutLink = screen.getByTestId('hr-logout-link');
    expect(logoutLink).toBeInTheDocument();
    expect(logoutLink).toHaveTextContent('Logout');
    expect(logoutLink).toHaveAttribute('href', '/login-hr');
  });

  test('renders main content area', () => {
    render(
      <HRLayout>
        <div>Test Content</div>
      </HRLayout>
    );
    
    // Check if main content area is rendered
    expect(screen.getByTestId('hr-main-content')).toBeInTheDocument();
  });
}); 