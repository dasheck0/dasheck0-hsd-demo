import { Task } from '../types/Task';

/**
 * Generates demo tasks for initial board population
 * @returns Array of 5 example tasks distributed across all statuses
 */
export function generateDemoTasks(): Task[] {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextWeek = new Date(now);
  nextWeek.setDate(nextWeek.getDate() + 7);

  const demoTasks: Task[] = [
    {
      id: generateId(),
      title: 'Design new landing page',
      description: 'Create mockups for the new landing page with updated branding',
      assignee: 'Alice Johnson',
      priority: 'High',
      dueDate: formatDate(tomorrow),
      status: 'todo',
    },
    {
      id: generateId(),
      title: 'Fix login bug',
      description: 'Users report issues with OAuth login on mobile devices',
      assignee: 'Bob Smith',
      priority: 'High',
      dueDate: formatDate(now),
      status: 'in-progress',
    },
    {
      id: generateId(),
      title: 'Update documentation',
      description: 'Add API examples and update outdated sections',
      assignee: 'Carol Davis',
      priority: 'Medium',
      dueDate: formatDate(nextWeek),
      status: 'in-progress',
    },
    {
      id: generateId(),
      title: 'Optimize database queries',
      description: '',
      assignee: '',
      priority: 'Low',
      dueDate: '',
      status: 'todo',
    },
    {
      id: generateId(),
      title: 'Setup CI/CD pipeline',
      description: 'Configure automated testing and deployment',
      assignee: 'David Lee',
      priority: 'Medium',
      dueDate: '',
      status: 'done',
    },
  ];

  return demoTasks;
}

/**
 * Generates a unique ID for a task
 * Uses crypto.randomUUID() if available, otherwise falls back to timestamp-based ID
 * @returns Unique string ID
 */
function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for environments without crypto.randomUUID
  return `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Formats a Date object to MM/DD/YYYY string
 * @param date - Date to format
 * @returns Formatted date string
 */
function formatDate(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}
