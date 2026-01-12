import { render, screen } from '@testing-library/react';
import { DndContext } from '@dnd-kit/core';
import TaskCard from './TaskCard';
import { Task } from '../types/Task';

// Wrapper component to provide DndContext for testing
function DndWrapper({ children }: { children: React.ReactNode }): React.JSX.Element {
  return <DndContext>{children}</DndContext>;
}

describe('TaskCard', () => {
  const fullTask: Task = {
    id: '1',
    title: 'Test Task',
    description: 'This is a test task description',
    assignee: 'John Doe',
    priority: 'High',
    dueDate: '12/31/2026',
    status: 'todo',
  };

  it('renders task title', () => {
    render(
      <DndWrapper>
        <TaskCard task={fullTask} />
      </DndWrapper>
    );

    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });

  it('renders task description when present', () => {
    render(
      <DndWrapper>
        <TaskCard task={fullTask} />
      </DndWrapper>
    );

    expect(screen.getByText('This is a test task description')).toBeInTheDocument();
  });

  it('does not render description when not present', () => {
    const taskWithoutDescription: Task = {
      ...fullTask,
      description: '',
    };

    render(
      <DndWrapper>
        <TaskCard task={taskWithoutDescription} />
      </DndWrapper>
    );

    expect(screen.queryByText('This is a test task description')).not.toBeInTheDocument();
  });

  it('renders assignee when present', () => {
    render(
      <DndWrapper>
        <TaskCard task={fullTask} />
      </DndWrapper>
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('does not render assignee when not present', () => {
    const taskWithoutAssignee: Task = {
      ...fullTask,
      assignee: '',
    };

    render(
      <DndWrapper>
        <TaskCard task={taskWithoutAssignee} />
      </DndWrapper>
    );

    expect(screen.queryByText('Assignee:')).not.toBeInTheDocument();
  });

  it('renders due date when present', () => {
    render(
      <DndWrapper>
        <TaskCard task={fullTask} />
      </DndWrapper>
    );

    expect(screen.getByText('12/31/2026')).toBeInTheDocument();
  });

  it('does not render due date when not present', () => {
    const taskWithoutDueDate: Task = {
      ...fullTask,
      dueDate: '',
    };

    render(
      <DndWrapper>
        <TaskCard task={taskWithoutDueDate} />
      </DndWrapper>
    );

    expect(screen.queryByText('Due:')).not.toBeInTheDocument();
  });

  it('renders priority badge', () => {
    render(
      <DndWrapper>
        <TaskCard task={fullTask} />
      </DndWrapper>
    );

    expect(screen.getByText('High')).toBeInTheDocument();
  });

  it('applies correct CSS class for High priority', () => {
    render(
      <DndWrapper>
        <TaskCard task={fullTask} />
      </DndWrapper>
    );

    const priorityBadge = screen.getByText('High');
    expect(priorityBadge).toHaveClass('priority-high');
  });

  it('applies correct CSS class for Medium priority', () => {
    const mediumTask: Task = {
      ...fullTask,
      priority: 'Medium',
    };

    render(
      <DndWrapper>
        <TaskCard task={mediumTask} />
      </DndWrapper>
    );

    const priorityBadge = screen.getByText('Medium');
    expect(priorityBadge).toHaveClass('priority-medium');
  });

  it('applies correct CSS class for Low priority', () => {
    const lowTask: Task = {
      ...fullTask,
      priority: 'Low',
    };

    render(
      <DndWrapper>
        <TaskCard task={lowTask} />
      </DndWrapper>
    );

    const priorityBadge = screen.getByText('Low');
    expect(priorityBadge).toHaveClass('priority-low');
  });

  it('renders minimal task with only required fields', () => {
    const minimalTask: Task = {
      id: '2',
      title: 'Minimal Task',
      priority: 'Medium',
      status: 'todo',
    };

    render(
      <DndWrapper>
        <TaskCard task={minimalTask} />
      </DndWrapper>
    );

    expect(screen.getByText('Minimal Task')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
    expect(screen.queryByText('Assignee:')).not.toBeInTheDocument();
    expect(screen.queryByText('Due:')).not.toBeInTheDocument();
  });

  it('uses article element for semantic HTML', () => {
    const { container } = render(
      <DndWrapper>
        <TaskCard task={fullTask} />
      </DndWrapper>
    );

    const article = container.querySelector('article');
    expect(article).toBeInTheDocument();
  });

  it('uses time element for due date with datetime attribute', () => {
    render(
      <DndWrapper>
        <TaskCard task={fullTask} />
      </DndWrapper>
    );

    const timeElement = screen.getByText('12/31/2026');
    expect(timeElement.tagName).toBe('TIME');
    expect(timeElement).toHaveAttribute('dateTime', '12/31/2026');
  });
});
