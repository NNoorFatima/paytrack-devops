import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock the components
jest.mock('./components/ManagerSidebar', () => {
  return function MockManagerSidebar() {
    return <div data-testid="mock-sidebar">Sidebar</div>;
  };
});

jest.mock('./routes/Routes', () => {
  return function MockRoutes() {
    return <div data-testid="mock-routes">Routes</div>;
  };
});

describe('App Component', () => {
  test('renders app with sidebar and routes', () => {
    render(<App />);
    
    // Check if app is rendered
    expect(screen.getByTestId('app')).toBeInTheDocument();
    
    // Check if sidebar is rendered
    expect(screen.getByTestId('mock-sidebar')).toBeInTheDocument();
    
    // Check if routes are rendered
    expect(screen.getByTestId('mock-routes')).toBeInTheDocument();
  });
});
