import { generateDemoTasks } from './demoData';
import { TaskStatus } from '../types/Task';

describe('demoData', () => {
  describe('generateDemoTasks', () => {
    it('should return 5 tasks', () => {
      const tasks = generateDemoTasks();
      expect(tasks).toHaveLength(5);
    });

    it('should return tasks with all required properties', () => {
      const tasks = generateDemoTasks();

      tasks.forEach((task) => {
        expect(task).toHaveProperty('id');
        expect(task).toHaveProperty('title');
        expect(task).toHaveProperty('description');
        expect(task).toHaveProperty('assignee');
        expect(task).toHaveProperty('priority');
        expect(task).toHaveProperty('dueDate');
        expect(task).toHaveProperty('status');
      });
    });

    it('should generate unique IDs for each task', () => {
      const tasks = generateDemoTasks();
      const ids = tasks.map((task) => task.id);
      const uniqueIds = new Set(ids);

      expect(uniqueIds.size).toBe(tasks.length);
    });

    it('should have valid priority values', () => {
      const tasks = generateDemoTasks();
      const validPriorities = ['Low', 'Medium', 'High'];

      tasks.forEach((task) => {
        expect(validPriorities).toContain(task.priority);
      });
    });

    it('should have valid status values', () => {
      const tasks = generateDemoTasks();
      const validStatuses: TaskStatus[] = ['todo', 'in-progress', 'done'];

      tasks.forEach((task) => {
        expect(validStatuses).toContain(task.status);
      });
    });

    it('should distribute tasks across all statuses', () => {
      const tasks = generateDemoTasks();
      const statuses = tasks.map((task) => task.status);

      expect(statuses).toContain('todo');
      expect(statuses).toContain('in-progress');
      expect(statuses).toContain('done');
    });

    it('should have non-empty titles', () => {
      const tasks = generateDemoTasks();

      tasks.forEach((task) => {
        expect(task.title).toBeTruthy();
        expect(task.title.length).toBeGreaterThan(0);
      });
    });

    it('should include tasks with and without optional fields', () => {
      const tasks = generateDemoTasks();

      const hasTaskWithoutDescription = tasks.some((task) => !task.description);
      const hasTaskWithDescription = tasks.some((task) => task.description);
      const hasTaskWithoutAssignee = tasks.some((task) => !task.assignee);
      const hasTaskWithAssignee = tasks.some((task) => task.assignee);
      const hasTaskWithoutDueDate = tasks.some((task) => !task.dueDate);
      const hasTaskWithDueDate = tasks.some((task) => task.dueDate);

      // At least one task should have each optional field
      expect(hasTaskWithDescription).toBe(true);
      expect(hasTaskWithAssignee).toBe(true);
      expect(hasTaskWithDueDate).toBe(true);

      // At least one task should be missing optional fields (showcasing they're optional)
      expect(hasTaskWithoutDescription || hasTaskWithoutAssignee || hasTaskWithoutDueDate).toBe(true);
    });

    it('should format due dates as MM/DD/YYYY when present', () => {
      const tasks = generateDemoTasks();
      const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;

      tasks.forEach((task) => {
        if (task.dueDate) {
          expect(task.dueDate).toMatch(dateRegex);
        }
      });
    });

    it('should include different priority levels', () => {
      const tasks = generateDemoTasks();
      const priorities = tasks.map((task) => task.priority);
      const uniquePriorities = new Set(priorities);

      // Should have at least 2 different priority levels
      expect(uniquePriorities.size).toBeGreaterThanOrEqual(2);
    });
  });
});
