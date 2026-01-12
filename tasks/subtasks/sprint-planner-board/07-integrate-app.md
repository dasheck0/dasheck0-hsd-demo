# 07. Integrate SprintBoard into App.tsx

meta:
  id: sprint-planner-board-07
  feature: sprint-planner-board
  priority: P1
  depends_on: [sprint-planner-board-06]
  tags: [implementation, integration]

## objective
- Replace default Create React App content with SprintBoard component
- Ensure clean integration following project structure
- Maintain existing App.css styles where appropriate

## deliverables
- Updated src/App.tsx - imports and renders SprintBoard
- Updated src/App.css - board-specific styles or cleanup

## steps
1. Update App.tsx:
   - Import SprintBoard component
   - Replace existing JSX with SprintBoard component
   - Add optional header/title for the application
   - Remove unused imports (logo, default content)
2. Update App.css:
   - Remove or comment out unused styles (App-logo, App-header spinning animation)
   - Keep App container styles if useful for board layout
   - Add any app-level styles (body background, font defaults)
   - Ensure no style conflicts with SprintBoard
3. Test in browser:
   - Run `npm start`
   - Verify board loads correctly
   - Check for console errors

## tests
- Unit: App.test.tsx
  - Arrange: Render App component
  - Act: Query for SprintBoard presence
  - Assert: SprintBoard renders without errors
  - Update existing test to check for board elements instead of "Learn React" link

## acceptance_criteria
- App.tsx imports and renders SprintBoard component
- Application runs without errors (`npm start`)
- SprintBoard displays correctly in browser
- No console errors or warnings
- Existing test updated and passes
- TypeScript compilation succeeds

## validation
- Run: `npm start` - verify board displays in browser
- Run: `npm test -- App.test`
- Run: `npm run build`
- Verify: App loads, board is functional, tests pass

## notes
- Keep App.tsx minimal - it should primarily render SprintBoard
- Consider adding application title/header outside SprintBoard
- Preserve any useful global styles from App.css
- Test that demo data loads correctly when localStorage is empty
