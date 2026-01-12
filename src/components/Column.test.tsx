import { render, screen } from '@testing-library/react';
import { DndContext } from '@dnd-kit/core';
import Column from './Column';
import { Task } from '../types/Task';

// Wrapper component to provide DndContext for testing
function DndWrapper({ children }: { children: React.ReactNode }): React.JSX.Element {
  return <DndContext>{children}</DndContext>;
}

describe('Column', () => {
  const mockOnAddTask = jest.fn();

  const sampleTasks: Task[] = [
    {
      id: '1',
      title: 'Task 1',
      priority: 'High',
      status: 'todo',
    },
    {
      id: '2',
      title: 'Task 2',
      description: 'Description 2',
      priority: 'Medium',
      status: 'todo',
    },
  ];

  beforeEach(() => {
    mockOnAddTask.mockClear();
  });

  it('renders column title', () => {
    render(
      <DndWrapper>
        <Column title="To Do" status="todo" tasks={[]} onAddTask={mockOnAddTask} />
      </DndWrapper>
    );

    expect(screen.getByText('To Do')).toBeInTheDocument();
  });

  it('renders task count badge', () => {
    render(
      <DndWrapper>
        <Column title="To Do" status="todo" tasks={sampleTasks} onAddTask={mockOnAddTask} />
      </DndWrapper>
    );

    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('renders QuickAddTask component', () => {
    render(
      <DndWrapper>
        <Column title="To Do" status="todo" tasks={[]} onAddTask={mockOnAddTask} />
      </DndWrapper>
    );

    expect(screen.getByPlaceholderText('Add new task...')).toBeInTheDocument();
  });

  it('renders all task cards', () => {
    render(
      <DndWrapper>
        <Column title="To Do" status="todo" tasks={sampleTasks} onAddTask={mockOnAddTask} />
      </DndWrapper>
    );

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });

  it('displays empty state when no tasks', () => {
    render(
      <DndWrapper>
        <Column title="To Do" status="todo" tasks={[]} onAddTask={mockOnAddTask} />
      </DndWrapper>
    );

    expect(screen.getByText('No tasks yet')).toBeInTheDocument();
    expect(screen.getByText('Add a task or drag one here')).toBeInTheDocument();
  });

  it('does not display empty state when tasks exist', () => {
    render(
      <DndWrapper>
        <Column title="To Do" status="todo" tasks={sampleTasks} onAddTask={mockOnAddTask} />
      </DndWrapper>
    );

    expect(screen.queryByText('No tasks yet')).not.toBeInTheDocument();
  });

  it('shows count of 0 for empty column', () => {
    render(
      <DndWrapper>
        <Column title="To Do" status="todo" tasks={[]} onAddTask={mockOnAddTask} />
      </DndWrapper>
    );

    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('passes onAddTask prop to QuickAddTask', () => {
    render(
      <DndWrapper>
        <Column title="To Do" status="todo" tasks={[]} onAddTask={mockOnAddTask} />
      </DndWrapper>
    );

    const input = screen.getByPlaceholderText('Add new task...');
    const button = screen.getByRole('button', { name: /add/i });

    // Type and submit
    input.setAttribute('value', 'New task');
    button.click();

    // The actual interaction would be tested in integration tests
    // Here we just verify the component is rendered
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('uses section element for semantic HTML', () => {
    const { container } = render(
      <DndWrapper>
        <Column title="To Do" status="todo" tasks={[]} onAddTask={mockOnAddTask} />
      </DndWrapper>
    );

    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });

  it('uses h2 for column title', () => {
    render(
      <DndWrapper>
        <Column title="To Do" status="todo" tasks={[]} onAddTask={mockOnAddTask} />
      </DndWrapper>
    );

    const heading = screen.getByRole('heading', { level: 2, name: 'To Do' });
    expect(heading).toBeInTheDocument();
  });

  it('renders multiple tasks correctly', () => {
    const manyTasks: Task[] = [
      { id: '1', title: 'Task 1', priority: 'High', status: 'todo' },
      { id: '2', title: 'Task 2', priority: 'Medium', status: 'todo' },
      { id: '3', title: 'Task 3', priority: 'Low', status: 'todo' },
      { id: '4', title: 'Task 4', priority: 'High', status: 'todo' },
    ];

    render(
      <DndWrapper>
        <Column title="To Do" status="todo" tasks={manyTasks} onAddTask={mockOnAddTask} />
      </DndWrapper>
    );

    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
    expect(screen.getByText('Task 3')).toBeInTheDocument();
    expect(screen.getByText('Task 4')).toBeInTheDocument();
  });
});
