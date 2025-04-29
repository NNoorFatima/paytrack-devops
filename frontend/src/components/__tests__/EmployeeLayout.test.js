import React from 'react';
import { render, screen } from '@testing-library/react';
import EmployeeLayout from '../EmployeeLayout';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  Link: ({ children, to, className, 'data-testid': dataTestId }) => (
    <a href={to} className={className} data-testid={dataTestId}>
      {children}
    </a>
  ),
  Outlet: () => <div data-testid="outlet">Outlet</div>,
}));

// Mock the EmployeeSidebar component
jest.mock('../EmployeeSidebar', () => {
  return function MockEmployeeSidebar() {
    return <div data-testid="employee-sidebar">Sidebar</div>;
  };
});

describe('EmployeeLayout Component', () => {
  test('renders employee layout with sidebar and content', () => {
    render(
      <EmployeeLayout>
        <div>Test Content</div>
      </EmployeeLayout>
    );
    
    // Check if layout is rendered
    expect(screen.getByTestId('employee-dashboard-container')).toBeInTheDocument();
    
    // Check if sidebar is rendered
    expect(screen.getByTestId('employee-sidebar')).toBeInTheDocument();
    
    // Check if content is rendered
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    render(
      <EmployeeLayout>
        <div>Test Content</div>
      </EmployeeLayout>
    );
    
    // Check if profile link is rendered
    const profileLink = screen.getByTestId('employee-profile-link');
    expect(profileLink).toBeInTheDocument();
    expect(profileLink).toHaveTextContent('Profile');
    expect(profileLink).toHaveAttribute('href', '/profile');

    // Check if logout link is rendered
    const logoutLink = screen.getByTestId('employee-logout-link');
    expect(logoutLink).toBeInTheDocument();
    expect(logoutLink).toHaveTextContent('Logout');
    expect(logoutLink).toHaveAttribute('href', '/employee-login');
  });

  test('renders main content area', () => {
    render(
      <EmployeeLayout>
        <div>Test Content</div>
      </EmployeeLayout>
    );
    
    // Check if main content area is rendered
    expect(screen.getByTestId('employee-main-content')).toBeInTheDocument();
  });
}); 