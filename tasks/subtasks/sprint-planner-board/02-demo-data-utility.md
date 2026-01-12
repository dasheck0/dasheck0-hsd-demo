# 02. Create demo data generator and localStorage utility functions

meta:
  id: sprint-planner-board-02
  feature: sprint-planner-board
  priority: P1
  depends_on: [sprint-planner-board-01]
  tags: [implementation, utilities, tests-required]

## objective
- Create utility functions for localStorage operations (save, load)
- Create demo data generator that produces 3-5 example tasks
- Ensure type safety with Task interface

## deliverables
- src/utils/taskStorage.ts - localStorage save/load functions
- src/utils/demoData.ts - demo task generator
- Unit tests for both utilities

## steps
1. Create src/utils/ directory if it doesn't exist
2. Create taskStorage.ts with functions:
   - `saveTasks(tasks: Task[]): void` - saves to localStorage with key 'sprintPlannerTasks'
   - `loadTasks(): Task[] | null` - loads from localStorage, handles parse errors
   - Add error handling for localStorage quota exceeded
3. Create demoData.ts with function:
   - `generateDemoTasks(): Task[]` - returns 3-5 tasks distributed across all statuses
   - Include varied assignees, priorities, and due dates
   - Use UUID or timestamp-based IDs
4. Add JSDoc comments for all exported functions

## tests
- Unit: taskStorage.ts
  - Arrange: Mock localStorage, create task array
  - Act: Call saveTasks(), then loadTasks()
  - Assert: Loaded tasks match saved tasks
  - Test: Handle corrupted localStorage data gracefully
  - Test: Handle localStorage quota exceeded error
- Unit: demoData.ts
  - Arrange: Call generateDemoTasks()
  - Act: Validate returned array
  - Assert: 3-5 tasks returned, all have valid properties, tasks distributed across statuses

## acceptance_criteria
- saveTasks() successfully writes to localStorage with correct key
- loadTasks() returns parsed tasks or null if no data
- loadTasks() handles JSON parse errors gracefully (returns null or empty array)
- generateDemoTasks() returns valid Task objects with all required properties
- Demo tasks include at least one task in each status (todo, in-progress, done)
- All functions are strongly typed with no `any` types
- JSDoc comments present for all exported functions

## validation
- Run: `npm test -- taskStorage.test`
- Run: `npm test -- demoData.test`
- Run: `npm run build`
- Verify: All tests pass, TypeScript compilation succeeds

## notes
- localStorage key must be 'sprintPlannerTasks' per PRD
- Use try-catch for JSON.parse() to handle corrupted data
- Consider using crypto.randomUUID() for IDs if available, else Date.now() + random
- Demo data should showcase all features: varied priorities, some with/without assignees, some with/without due dates
