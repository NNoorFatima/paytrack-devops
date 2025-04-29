import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AdminSidebar from '../AdminSidebar';

const mockNavigate = jest.fn();

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

describe('AdminSidebar Component', () => {
  beforeEach(() => {
    // Clear mock before each test
    mockNavigate.mockClear();
  });

  test('renders admin sidebar with all buttons', () => {
    render(<AdminSidebar />);
    
    // Check if sidebar is rendered
    expect(screen.getByTestId('admin-sidebar')).toBeInTheDocument();
    
    // Check if all buttons are rendered with correct text
    expect(screen.getByText('🏠 About Us')).toBeInTheDocument();
    expect(screen.getByText('🤐Remove HR')).toBeInTheDocument();
    expect(screen.getByText('🕵️Add HR')).toBeInTheDocument();
    expect(screen.getByText('💼 Add Manager')).toBeInTheDocument();
    expect(screen.getByText('🐥 Remove Manager')).toBeInTheDocument();
    expect(screen.getByText('🧑‍💼 View HR')).toBeInTheDocument();
    expect(screen.getByText('👩‍💻 View Manager')).toBeInTheDocument();
  });

  test('navigates to correct routes when buttons are clicked', () => {
    render(<AdminSidebar />);
    
    // Test navigation for each button
    const buttons = [
      { text: '🏠 About Us', route: '/about-us' },
      { text: '🤐Remove HR', route: '/remove-hr' },
      { text: '🕵️Add HR', route: '/add-hr' },
      { text: '💼 Add Manager', route: '/add-manager' },
      { text: '🐥 Remove Manager', route: '/remove-manager' },
      { text: '🧑‍💼 View HR', route: '/admin-view-hr' },
      { text: '👩‍💻 View Manager', route: '/admin-view-manager' },
    ];

    buttons.forEach(({ text, route }) => {
      const button = screen.getByText(text);
      fireEvent.click(button);
      expect(mockNavigate).toHaveBeenCalledWith(route);
    });
  });

  test('renders admin panel title', () => {
    render(<AdminSidebar />);
    
    // Check if admin panel title is rendered
    expect(screen.getByText('Admin Panel')).toBeInTheDocument();
  });
}); 