export type Priority = 'Low' | 'Medium' | 'High';
export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description?: string;
  assignee?: string;
  priority: Priority;
  dueDate?: string;
  status: TaskStatus;
}
