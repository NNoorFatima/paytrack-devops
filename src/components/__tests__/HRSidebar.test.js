import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HRSidebar from '../HRSidebar';

const mockNavigate = jest.fn();

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

describe('HRSidebar Component', () => {
  beforeEach(() => {
    // Clear mock before each test
    mockNavigate.mockClear();
  });

  test('renders HR sidebar with all buttons', () => {
    render(<HRSidebar />);
    
    // Check if sidebar is rendered
    expect(screen.getByTestId('hr-sidebar')).toBeInTheDocument();
    
    // Check if all buttons are rendered with correct text
    expect(screen.getByText('🏠 Payroll Processing')).toBeInTheDocument();
    expect(screen.getByText('📝Employee Removal')).toBeInTheDocument();
    expect(screen.getByText('💼 Leave Reports')).toBeInTheDocument();
    expect(screen.getByText('🧑 Add Employee')).toBeInTheDocument();
  });

  test('navigates to correct routes when buttons are clicked', () => {
    render(<HRSidebar />);
    
    // Test navigation for each button
    const buttons = [
      { testId: 'payroll-btn', route: '/payroll-processing' },
      { testId: 'emp-removal-btn', route: '/emp-removal' },
      { testId: 'leave-reports-btn', route: '/leave-reports' },
      { testId: 'add-emp-btn', route: '/add-emp' },
    ];

    buttons.forEach(({ testId, route }) => {
      const button = screen.getByTestId(testId);
      fireEvent.click(button);
      expect(mockNavigate).toHaveBeenCalledWith(route);
    });
  });

  test('renders HR panel title', () => {
    render(<HRSidebar />);
    
    // Check if HR panel title is rendered
    expect(screen.getByText('HR Panel')).toBeInTheDocument();
  });
}); 