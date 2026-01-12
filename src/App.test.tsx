import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { loadTasks } from './utils/taskStorage';
import { generateDemoTasks } from './utils/demoData';

// Mock the utility modules
jest.mock('./utils/taskStorage');
jest.mock('./utils/demoData');

const mockLoadTasks = loadTasks as jest.MockedFunction<typeof loadTasks>;
const mockGenerateDemoTasks = generateDemoTasks as jest.MockedFunction<typeof generateDemoTasks>;

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLoadTasks.mockReturnValue(null);
    mockGenerateDemoTasks.mockReturnValue([]);
  });

  it('renders SprintBoard component', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Sprint Planner')).toBeInTheDocument();
    });
  });

  it('renders all three columns', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('To Do')).toBeInTheDocument();
      expect(screen.getByText('In Progress')).toBeInTheDocument();
      expect(screen.getByText('Done')).toBeInTheDocument();
    });
  });

  it('renders without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });
});
