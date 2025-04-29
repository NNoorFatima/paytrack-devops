import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EmployeeSidebar from '../EmployeeSidebar';

const mockNavigate = jest.fn();

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

describe('EmployeeSidebar Component', () => {
  beforeEach(() => {
    // Clear mock before each test
    mockNavigate.mockClear();
  });

  test('renders employee sidebar with all buttons', () => {
    render(<EmployeeSidebar />);
    
    // Check if sidebar is rendered
    expect(screen.getByTestId('employee-sidebar')).toBeInTheDocument();
    
    // Check if all buttons are rendered with correct text
    expect(screen.getByText('🏠 PaySlip')).toBeInTheDocument();
    expect(screen.getByText('📝Profile')).toBeInTheDocument();
    expect(screen.getByText('💼 Leave Requests')).toBeInTheDocument();
    expect(screen.getByText('🚨 Leave Approval')).toBeInTheDocument();
  });

  test('navigates to correct routes when buttons are clicked', () => {
    render(<EmployeeSidebar />);
    
    // Test navigation for each button
    const buttons = [
      { testId: 'payslip-btn', route: '/payslip' },
      { testId: 'profile-btn', route: '/profile' },
      { testId: 'leave-request-btn', route: '/leave-request' },
      { testId: 'leave-approval-btn', route: '/leave-approval' },
    ];

    buttons.forEach(({ testId, route }) => {
      const button = screen.getByTestId(testId);
      fireEvent.click(button);
      expect(mockNavigate).toHaveBeenCalledWith(route);
    });
  });

  test('renders employee panel title', () => {
    render(<EmployeeSidebar />);
    
    // Check if employee panel title is rendered
    expect(screen.getByText('Employee Panel')).toBeInTheDocument();
  });
}); 