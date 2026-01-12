# 09. Write unit and integration tests for all components

meta:
  id: sprint-planner-board-09
  feature: sprint-planner-board
  priority: P1
  depends_on: [sprint-planner-board-03, sprint-planner-board-04, sprint-planner-board-05, sprint-planner-board-06]
  tags: [testing, quality-assurance]

## objective
- Ensure comprehensive test coverage for all components and utilities
- Validate component behavior, integration, and edge cases
- Follow React Testing Library best practices

## deliverables
- Complete test suites for all components:
  - src/utils/taskStorage.test.ts
  - src/utils/demoData.test.ts
  - src/components/TaskCard.test.tsx
  - src/components/QuickAddTask.test.tsx
  - src/components/Column.test.tsx
  - src/components/SprintBoard.test.tsx
  - Updated src/App.test.tsx

## steps
1. Review existing test files created in tasks 02-06
2. Ensure test coverage for:
   - **taskStorage.ts**: save/load operations, error handling
   - **demoData.ts**: demo task generation, data validity
   - **TaskCard.tsx**: rendering all fields, priority colors, optional fields
   - **QuickAddTask.tsx**: input handling, validation, submission
   - **Column.tsx**: rendering tasks, empty state, task count
   - **SprintBoard.tsx**: initial load, adding tasks, localStorage persistence
   - **App.tsx**: SprintBoard integration
3. Add integration tests:
   - Complete flow: load board → add task → verify persistence
   - Drag-and-drop flow (if testable with current setup)
4. Use React Testing Library patterns:
   - Prefer getByRole, getByLabelText, getByText over getByTestId
   - Use userEvent for interactions
   - Test accessibility (screen reader compatibility)
5. Mock localStorage for consistent test environment
6. Achieve minimum 80% code coverage

## tests
All tests should follow Arrange-Act-Assert pattern:

### taskStorage.test.ts
- Test: saveTasks writes to localStorage
- Test: loadTasks retrieves saved tasks
- Test: loadTasks handles corrupted data
- Test: loadTasks returns null when no data

### demoData.test.ts
- Test: generateDemoTasks returns 3-5 tasks
- Test: tasks have all required properties
- Test: tasks distributed across all statuses

### TaskCard.test.tsx
- Test: renders all task properties
- Test: priority color coding correct
- Test: optional fields hidden when undefined

### QuickAddTask.test.tsx
- Test: input accepts text
- Test: submission creates task
- Test: empty validation works
- Test: input clears after submission

### Column.test.tsx
- Test: renders column title and count
- Test: renders all task cards
- Test: empty state displays correctly

### SprintBoard.test.tsx
- Test: loads demo data on first run
- Test: loads saved tasks from localStorage
- Test: adding task updates board and localStorage

### App.test.tsx
- Test: SprintBoard renders without errors

## acceptance_criteria
- All test suites pass: `npm test -- --watchAll=false`
- Test coverage >= 80% for components and utilities
- No console errors or warnings during test runs
- Tests follow React Testing Library best practices
- Tests are well-organized with clear descriptions
- Edge cases covered (empty state, invalid input, errors)

## validation
- Run: `npm test -- --watchAll=false --coverage`
- Verify: All tests pass
- Verify: Coverage report shows >= 80% coverage
- Review: Coverage report identifies any untested code paths

## notes
- Mock @dnd-kit hooks if needed for testing drag-and-drop
- Use @testing-library/user-event for realistic user interactions
- Test accessibility: labels, ARIA attributes, keyboard navigation
- Consider using jest.mock() for localStorage and external dependencies
- Group related tests with describe blocks
- Use beforeEach/afterEach for setup/cleanup (e.g., clear localStorage)
