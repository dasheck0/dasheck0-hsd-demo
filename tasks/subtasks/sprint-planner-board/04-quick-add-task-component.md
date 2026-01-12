# 04. Build QuickAddTask component with input validation

meta:
  id: sprint-planner-board-04
  feature: sprint-planner-board
  priority: P1
  depends_on: [sprint-planner-board-02]
  tags: [implementation, component, tests-required]

## objective
- Create QuickAddTask component for rapid task creation with minimal input
- Implement input validation (non-empty title required)
- Support Enter key and button click for task submission

## deliverables
- src/components/QuickAddTask.tsx - QuickAddTask component
- src/components/QuickAddTask.css - Component styles
- src/components/QuickAddTask.test.tsx - Unit tests

## steps
1. Create QuickAddTask.tsx component:
   - Accept onAddTask callback prop: `(title: string) => void`
   - Use controlled input with useState for title
   - Handle form submission (Enter key or button click)
   - Validate: title must not be empty or whitespace-only
   - Clear input after successful submission
   - Prevent default form submission behavior
2. Create QuickAddTask.css:
   - Input style: clean border, padding, focus state
   - Button style: primary action button (subtle blue/green)
   - Layout: horizontal (input + button) or vertical for mobile
   - Placeholder text: "Add new task..."
3. Show validation feedback if user tries to submit empty title
4. Auto-focus input after successful task creation (UX enhancement)

## tests
- Unit: QuickAddTask component
  - Arrange: Render component with mock onAddTask callback
  - Act: Type title, click Add button
  - Assert: onAddTask called with correct title, input cleared
  - Test: Pressing Enter submits task
  - Test: Empty title validation prevents submission
  - Test: Whitespace-only title validation prevents submission
  - Test: Input clears after successful submission
  - Test: onAddTask receives trimmed title (no leading/trailing whitespace)

## acceptance_criteria
- Input accepts text and shows placeholder
- Add button triggers task creation
- Enter key triggers task creation
- Empty/whitespace-only titles are rejected
- Input clears after successful submission
- onAddTask callback receives trimmed, non-empty title
- Component is strongly typed with explicit prop interface
- No TypeScript errors or warnings

## validation
- Run: `npm test -- QuickAddTask.test`
- Run: `npm run build`
- Visual: Test in browser - type, submit, validate empty input
- Verify: All tests pass, component behaves correctly

## notes
- Use <form> element for proper Enter key handling
- Trim whitespace from title before validation and submission
- Consider showing error message for invalid input (optional enhancement)
- Button should be disabled when input is empty (UX improvement)
- Accessible: label or aria-label for screen readers
