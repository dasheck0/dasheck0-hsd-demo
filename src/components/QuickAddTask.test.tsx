import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import QuickAddTask from './QuickAddTask';

describe('QuickAddTask', () => {
  it('renders input field and button', () => {
    const mockOnAddTask = jest.fn();
    render(<QuickAddTask onAddTask={mockOnAddTask} />);

    expect(screen.getByPlaceholderText('Add new task...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
  });

  it('allows typing in the input field', async () => {
    const mockOnAddTask = jest.fn();
    render(<QuickAddTask onAddTask={mockOnAddTask} />);

    const input = screen.getByPlaceholderText('Add new task...') as HTMLInputElement;
    await userEvent.type(input, 'New task');

    expect(input.value).toBe('New task');
  });

  it('calls onAddTask with trimmed title when button is clicked', async () => {
    const mockOnAddTask = jest.fn();
    render(<QuickAddTask onAddTask={mockOnAddTask} />);

    const input = screen.getByPlaceholderText('Add new task...');
    const button = screen.getByRole('button', { name: /add/i });

    await userEvent.type(input, '  New task  ');
    await userEvent.click(button);

    expect(mockOnAddTask).toHaveBeenCalledWith('New task');
    expect(mockOnAddTask).toHaveBeenCalledTimes(1);
  });

  it('calls onAddTask when Enter key is pressed', async () => {
    const mockOnAddTask = jest.fn();
    render(<QuickAddTask onAddTask={mockOnAddTask} />);

    const input = screen.getByPlaceholderText('Add new task...');

    await userEvent.type(input, 'New task{enter}');

    expect(mockOnAddTask).toHaveBeenCalledWith('New task');
    expect(mockOnAddTask).toHaveBeenCalledTimes(1);
  });

  it('clears input after successful submission', async () => {
    const mockOnAddTask = jest.fn();
    render(<QuickAddTask onAddTask={mockOnAddTask} />);

    const input = screen.getByPlaceholderText('Add new task...') as HTMLInputElement;
    const button = screen.getByRole('button', { name: /add/i });

    await userEvent.type(input, 'New task');
    await userEvent.click(button);

    expect(input.value).toBe('');
  });

  it('does not call onAddTask when input is empty', async () => {
    const mockOnAddTask = jest.fn();
    render(<QuickAddTask onAddTask={mockOnAddTask} />);

    const button = screen.getByRole('button', { name: /add/i });
    await userEvent.click(button);

    expect(mockOnAddTask).not.toHaveBeenCalled();
  });

  it('does not call onAddTask when input contains only whitespace', async () => {
    const mockOnAddTask = jest.fn();
    render(<QuickAddTask onAddTask={mockOnAddTask} />);

    const input = screen.getByPlaceholderText('Add new task...');
    const button = screen.getByRole('button', { name: /add/i });

    await userEvent.type(input, '   ');
    await userEvent.click(button);

    expect(mockOnAddTask).not.toHaveBeenCalled();
  });

  it('shows error message when trying to submit empty title', async () => {
    const mockOnAddTask = jest.fn();
    render(<QuickAddTask onAddTask={mockOnAddTask} />);

    const button = screen.getByRole('button', { name: /add/i });
    await userEvent.click(button);

    expect(screen.getByText('Task title cannot be empty')).toBeInTheDocument();
  });

  it('clears error message when user starts typing', async () => {
    const mockOnAddTask = jest.fn();
    render(<QuickAddTask onAddTask={mockOnAddTask} />);

    const input = screen.getByPlaceholderText('Add new task...');
    const button = screen.getByRole('button', { name: /add/i });

    // Trigger error
    await userEvent.click(button);
    expect(screen.getByText('Task title cannot be empty')).toBeInTheDocument();

    // Start typing
    await userEvent.type(input, 'T');
    expect(screen.queryByText('Task title cannot be empty')).not.toBeInTheDocument();
  });

  it('has accessible label for screen readers', () => {
    const mockOnAddTask = jest.fn();
    render(<QuickAddTask onAddTask={mockOnAddTask} />);

    const input = screen.getByLabelText('New task title');
    expect(input).toBeInTheDocument();
  });

  it('sets aria-invalid when error is present', async () => {
    const mockOnAddTask = jest.fn();
    render(<QuickAddTask onAddTask={mockOnAddTask} />);

    const input = screen.getByPlaceholderText('Add new task...');
    const button = screen.getByRole('button', { name: /add/i });

    // Trigger error
    await userEvent.click(button);

    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('associates error message with input via aria-describedby', async () => {
    const mockOnAddTask = jest.fn();
    render(<QuickAddTask onAddTask={mockOnAddTask} />);

    const input = screen.getByPlaceholderText('Add new task...');
    const button = screen.getByRole('button', { name: /add/i });

    // Trigger error
    await userEvent.click(button);

    expect(input).toHaveAttribute('aria-describedby', 'task-input-error');
    expect(screen.getByRole('alert')).toHaveTextContent('Task title cannot be empty');
  });
});
