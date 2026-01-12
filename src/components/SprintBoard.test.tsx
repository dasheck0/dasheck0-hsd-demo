import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SprintBoard from './SprintBoard';
import { loadTasks, saveTasks, clearTasks } from '../utils/taskStorage';
import { generateDemoTasks } from '../utils/demoData';

// Mock the utility modules
jest.mock('../utils/taskStorage');
jest.mock('../utils/demoData');

const mockLoadTasks = loadTasks as jest.MockedFunction<typeof loadTasks>;
const mockSaveTasks = saveTasks as jest.MockedFunction<typeof saveTasks>;
const mockClearTasks = clearTasks as jest.MockedFunction<typeof clearTasks>;
const mockGenerateDemoTasks = generateDemoTasks as jest.MockedFunction<typeof generateDemoTasks>;

describe('SprintBoard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSaveTasks.mockImplementation(() => {});
    mockClearTasks.mockImplementation(() => {});
  });

  it('renders board title', () => {
    mockLoadTasks.mockReturnValue(null);
    mockGenerateDemoTasks.mockReturnValue([]);

    render(<SprintBoard />);

    expect(screen.getByText('Sprint Planner')).toBeInTheDocument();
  });

  it('renders three columns', () => {
    mockLoadTasks.mockReturnValue(null);
    mockGenerateDemoTasks.mockReturnValue([]);

    render(<SprintBoard />);

    expect(screen.getByText('To Do')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
    expect(screen.getByText('Done')).toBeInTheDocument();
  });

  it('loads demo data on first run when localStorage is empty', async () => {
    const demoTasks = [
      {
        id: '1',
        title: 'Demo Task 1',
        priority: 'High' as const,
        status: 'todo' as const,
      },
      {
        id: '2',
        title: 'Demo Task 2',
        priority: 'Medium' as const,
        status: 'in-progress' as const,
      },
    ];

    mockLoadTasks.mockReturnValue(null);
    mockGenerateDemoTasks.mockReturnValue(demoTasks);

    render(<SprintBoard />);

    await waitFor(() => {
      expect(screen.getByText('Demo Task 1')).toBeInTheDocument();
      expect(screen.getByText('Demo Task 2')).toBeInTheDocument();
    });

    expect(mockGenerateDemoTasks).toHaveBeenCalledTimes(1);
    expect(mockSaveTasks).toHaveBeenCalledWith(demoTasks);
  });

  it('loads existing tasks from localStorage', async () => {
    const existingTasks = [
      {
        id: '1',
        title: 'Existing Task',
        priority: 'Low' as const,
        status: 'done' as const,
      },
    ];

    mockLoadTasks.mockReturnValue(existingTasks);

    render(<SprintBoard />);

    await waitFor(() => {
      expect(screen.getByText('Existing Task')).toBeInTheDocument();
    });

    expect(mockGenerateDemoTasks).not.toHaveBeenCalled();
  });

  it('adds new task to Todo column via QuickAddTask', async () => {
    mockLoadTasks.mockReturnValue(null);
    mockGenerateDemoTasks.mockReturnValue([]);

    render(<SprintBoard />);

    // Find the first QuickAddTask input (in Todo column)
    const inputs = screen.getAllByPlaceholderText('Add new task...');
    const todoInput = inputs[0];
    const addButton = screen.getAllByRole('button', { name: /add/i })[0];

    userEvent.type(todoInput, 'New Task');
    userEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('New Task')).toBeInTheDocument();
    });

    // Verify task was saved
    await waitFor(() => {
      expect(mockSaveTasks).toHaveBeenCalled();
    });
  });

  it('distributes tasks to correct columns by status', async () => {
    const tasks = [
      {
        id: '1',
        title: 'Todo Task',
        priority: 'Medium' as const,
        status: 'todo' as const,
      },
      {
        id: '2',
        title: 'In Progress Task',
        priority: 'High' as const,
        status: 'in-progress' as const,
      },
      {
        id: '3',
        title: 'Done Task',
        priority: 'Low' as const,
        status: 'done' as const,
      },
    ];

    mockLoadTasks.mockReturnValue(tasks);

    render(<SprintBoard />);

    await waitFor(() => {
      expect(screen.getByText('Todo Task')).toBeInTheDocument();
      expect(screen.getByText('In Progress Task')).toBeInTheDocument();
      expect(screen.getByText('Done Task')).toBeInTheDocument();
    });

    // Check column counts
    const counts = screen.getAllByText('1');
    expect(counts).toHaveLength(3); // Each column should have 1 task
  });

  it('saves tasks to localStorage when tasks change', async () => {
    mockLoadTasks.mockReturnValue(null);
    mockGenerateDemoTasks.mockReturnValue([]);

    render(<SprintBoard />);

    const inputs = screen.getAllByPlaceholderText('Add new task...');
    const todoInput = inputs[0];
    const addButton = screen.getAllByRole('button', { name: /add/i })[0];

    userEvent.type(todoInput, 'Save Test Task');
    userEvent.click(addButton);

    await waitFor(() => {
      expect(mockSaveTasks).toHaveBeenCalled();
    });
  });

  it('displays empty state in columns with no tasks', async () => {
    mockLoadTasks.mockReturnValue(null);
    mockGenerateDemoTasks.mockReturnValue([]);

    render(<SprintBoard />);

    await waitFor(() => {
      const emptyMessages = screen.getAllByText('No tasks yet');
      expect(emptyMessages.length).toBeGreaterThan(0);
    });
  });

  it('uses h1 for board title', () => {
    mockLoadTasks.mockReturnValue(null);
    mockGenerateDemoTasks.mockReturnValue([]);

    render(<SprintBoard />);

    const heading = screen.getByRole('heading', { level: 1, name: 'Sprint Planner' });
    expect(heading).toBeInTheDocument();
  });
});
