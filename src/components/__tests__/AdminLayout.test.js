import React from 'react';
import { render, screen } from '@testing-library/react';
import AdminLayout from '../AdminLayout';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  Link: ({ children, to }) => <a href={to}>{children}</a>,
  Outlet: () => <div data-testid="outlet">Outlet</div>,
}));

// Mock the AdminSidebar component
jest.mock('../AdminSidebar', () => {
  return function MockAdminSidebar() {
    return <div data-testid="admin-sidebar">Sidebar</div>;
  };
});

describe('AdminLayout Component', () => {
  test('renders admin layout with sidebar and content', () => {
    render(
      <AdminLayout>
        <div>Test Content</div>
      </AdminLayout>
    );
    
    // Check if layout is rendered
    expect(screen.getByTestId('dashboard-container')).toBeInTheDocument();
    
    // Check if sidebar is rendered
    expect(screen.getByTestId('admin-sidebar')).toBeInTheDocument();
    
    // Check if content is rendered
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    render(
      <AdminLayout>
        <div>Test Content</div>
      </AdminLayout>
    );
    
    // Check if navigation links are rendered
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });
}); 