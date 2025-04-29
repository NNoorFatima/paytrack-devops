import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ManagerSidebar from '../ManagerSidebar';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
  Link: ({ children, to }) => children,
}));

describe('ManagerSidebar', () => {
  let setView;
  beforeEach(() => {
    setView = jest.fn();
  });

  test('renders sidebar and all navigation buttons', () => {
    render(<ManagerSidebar setView={setView} />);
    expect(screen.getByTestId('manager-sidebar')).toBeInTheDocument();
    expect(screen.getByText('Manager Panel')).toBeInTheDocument();
    expect(screen.getByTestId('home-btn')).toBeInTheDocument();
    expect(screen.getByTestId('leave-requests-btn')).toBeInTheDocument();
    expect(screen.getByTestId('employees-btn')).toBeInTheDocument();
    expect(screen.getByTestId('reports-btn')).toBeInTheDocument();
    expect(screen.getByTestId('profile-btn')).toBeInTheDocument();
  });

  test('calls setView with correct arguments when buttons are clicked', () => {
    render(<ManagerSidebar setView={setView} />);
    fireEvent.click(screen.getByTestId('home-btn'));
    expect(setView).toHaveBeenCalledWith('home');
    fireEvent.click(screen.getByTestId('leave-requests-btn'));
    expect(setView).toHaveBeenCalledWith('leave-requests');
    fireEvent.click(screen.getByTestId('employees-btn'));
    expect(setView).toHaveBeenCalledWith('employees');
    fireEvent.click(screen.getByTestId('reports-btn'));
    expect(setView).toHaveBeenCalledWith('reports');
    fireEvent.click(screen.getByTestId('profile-btn'));
    expect(setView).toHaveBeenCalledWith('profile');
  });
}); 