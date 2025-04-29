import React from 'react';
import { render, screen } from '@testing-library/react';
import LeaveRequestCard from '../LeaveRequestCard';

// Mock the Badge component
jest.mock('../badge', () => ({
  Badge: ({ children, className, ...props }) => (
    <span className={`badge ${className}`} {...props}>
      {children}
    </span>
  ),
}));

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: [] })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
}));

describe('LeaveRequestCard Component', () => {
  const mockFormatDate = jest.fn(date => `Formatted: ${date}`);
  
  const mockRequest = {
    type: 'Annual Leave',
    leaveDate: '2023-05-15',
    status: 'Pending',
    reason: 'Family vacation',
    comments: 'Approved with conditions',
  };
  
  const renderLeaveRequestCard = (request = mockRequest) => {
    return render(
      <LeaveRequestCard 
        request={request} 
        formatDate={mockFormatDate} 
      />
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders leave request card with basic details', () => {
    renderLeaveRequestCard();
    
    // Check if card is rendered
    expect(screen.getByTestId('leave-request-card')).toBeInTheDocument();
    
    // Check if basic details are rendered
    expect(screen.getByTestId('leave-type')).toHaveTextContent('Annual Leave');
    expect(screen.getByTestId('leave-status')).toBeInTheDocument();
    expect(screen.getByTestId('leave-reason')).toHaveTextContent('Reason: Family vacation');
  });

  test('renders correct status icon for approved status', () => {
    const approvedRequest = {
      ...mockRequest,
      status: 'Approved',
    };
    
    renderLeaveRequestCard(approvedRequest);
    
    // Check if the correct status icon is rendered
    expect(screen.getByTestId('status-badge-approved')).toHaveTextContent('🎊 Approved');
  });

  test('renders correct status icon for pending status', () => {
    const pendingRequest = {
      ...mockRequest,
      status: 'Pending',
    };
    
    renderLeaveRequestCard(pendingRequest);
    
    // Check if the correct status icon is rendered
    expect(screen.getByTestId('status-badge-pending')).toHaveTextContent('👻 Pending');
  });

  test('renders correct status icon for rejected status', () => {
    const rejectedRequest = {
      ...mockRequest,
      status: 'Rejected',
    };
    
    renderLeaveRequestCard(rejectedRequest);
    
    // Check if the correct status icon is rendered
    expect(screen.getByTestId('status-badge-rejected')).toHaveTextContent('🤡 Rejected');
  });

  test('does not render comments for pending status', () => {
    const pendingRequest = {
      ...mockRequest,
      status: 'Pending',
      comments: undefined
    };
    
    renderLeaveRequestCard(pendingRequest);
    
    // Check if comments are not rendered
    expect(screen.queryByTestId('leave-comments')).not.toBeInTheDocument();
  });

  test('renders comments for non-pending status', () => {
    const approvedRequest = {
      ...mockRequest,
      status: 'Approved',
    };
    
    renderLeaveRequestCard(approvedRequest);
    
    // Check if comments are rendered
    expect(screen.getByTestId('leave-comments')).toBeInTheDocument();
    expect(screen.getByTestId('leave-comments')).toHaveTextContent('Comments: Approved with conditions');
  });
}); 