import React from 'react';
import { render, screen } from '@testing-library/react';
import ManagerLayout from '../ManagerLayout';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
  Outlet: () => <div data-testid="outlet">Outlet</div>,
}));

// Mock the ManagerSidebar component
jest.mock('../ManagerSidebar', () => {
  return function MockManagerSidebar() {
    return <div data-testid="manager-sidebar">Sidebar</div>;
  };
});

describe('ManagerLayout Component', () => {
  const mockSetView = jest.fn();

  test('renders manager layout with sidebar and content', () => {
    render(
      <ManagerLayout setView={mockSetView}>
        <div>Test Content</div>
      </ManagerLayout>
    );
    
    // Check if layout is rendered
    expect(screen.getByTestId('manager-layout')).toBeInTheDocument();
    
    // Check if sidebar is rendered
    expect(screen.getByTestId('manager-sidebar')).toBeInTheDocument();
    
    // Check if content is rendered
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
}); 