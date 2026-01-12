# Sprint Planner Board - E2E Validation Checklist

**Feature:** Sprint Planner Board  
**Date:** January 12, 2026  
**Status:** Ready for Validation

## Pre-Validation Setup

Before running validation tests, ensure:
- [ ] All dependencies installed: `npm install`
- [ ] No TypeScript errors: `npm run build`
- [ ] All unit tests passing: `npm test -- --watchAll=false`

## Exit Criteria Checklist

### Core Functionality
- [ ] All three columns (Todo, In Progress, Done) display correctly
- [ ] Drag-and-drop works smoothly between all columns with visual feedback
- [ ] Tasks persist in localStorage across page refreshes
- [ ] Demo data (3-5 tasks) appears on first load when localStorage is empty
- [ ] Quick-add creates tasks in Todo column with default values
- [ ] All TypeScript strict mode checks pass (`npm run build`)
- [ ] All tests pass (`npm test -- --watchAll=false`)

### Visual & Design
- [ ] Priority color coding works (High=red, Medium=yellow, Low=green)
- [ ] Responsive layout works on desktop (side-by-side columns)
- [ ] Responsive layout works on mobile (stacked or scrollable columns)
- [ ] Trello-like minimal design (rounded corners, shadows, clean spacing)
- [ ] Empty state messages display when columns have no tasks

### Performance & Quality
- [ ] No console errors or warnings in browser
- [ ] Board loads in < 1 second
- [ ] Drag-and-drop feels smooth (< 100ms response time)

## Manual Testing Steps

### 1. First Load Experience
```
1. Clear localStorage: Open DevTools → Application → Local Storage → Clear
2. Refresh page (Cmd+R / Ctrl+R)
3. Verify: 3-5 demo tasks appear
4. Verify: Tasks distributed across all three columns
5. Verify: Demo tasks have varied priorities, assignees, due dates
```

**Expected Result:** ✅ Demo data loads correctly with varied content

---

### 2. Task Creation
```
1. Locate QuickAddTask input in Todo column
2. Type: "Test New Task"
3. Click Add button (or press Enter)
4. Verify: Task appears in Todo column
5. Verify: Task has Medium priority (default)
6. Verify: Input field clears after submission
```

**Expected Result:** ✅ New task created in Todo column with defaults

---

### 3. Empty Input Validation
```
1. Click Add button without typing
2. Verify: Error message appears
3. Type whitespace only: "   "
4. Click Add button
5. Verify: Error message appears
6. Type valid text: "Valid Task"
7. Verify: Error message clears
```

**Expected Result:** ✅ Validation prevents empty task creation

---

### 4. Drag-and-Drop Functionality
```
1. Drag a task from Todo column
2. Verify: Visual feedback during drag (opacity, shadow)
3. Hover over In Progress column
4. Verify: Column highlights (drag-over state)
5. Drop task in In Progress column
6. Verify: Task moves to In Progress
7. Drag task from In Progress to Done
8. Verify: Task moves to Done
```

**Expected Result:** ✅ Drag-and-drop works smoothly with visual feedback

---

### 5. localStorage Persistence
```
1. Add new task: "Persistence Test"
2. Drag a task to a different column
3. Note current board state
4. Refresh page (Cmd+R / Ctrl+R)
5. Verify: All tasks remain in correct columns
6. Verify: "Persistence Test" task still present
```

**Expected Result:** ✅ All changes persist across page refresh

---

### 6. Priority Color Coding
```
For each priority level:
1. Find task with High priority
   - Verify: Red badge (#ef4444)
2. Find task with Medium priority
   - Verify: Yellow badge (#eab308)
3. Find task with Low priority
   - Verify: Green badge (#22c55e)
```

**Expected Result:** ✅ Priority colors match specification

---

### 7. Optional Fields Display
```
1. Find task with all fields (title, description, assignee, due date)
   - Verify: All fields display correctly
2. Find task with minimal fields (title only)
   - Verify: Only title and priority display
   - Verify: No empty sections for missing fields
```

**Expected Result:** ✅ Optional fields render conditionally

---

### 8. Responsive Design - Desktop (≥1024px)
```
1. Set browser width to 1280px
2. Verify: Three columns side-by-side
3. Verify: Adequate spacing between columns (24px gap)
4. Verify: Columns have equal width
5. Verify: No horizontal scroll
```

**Expected Result:** ✅ Desktop layout works correctly

---

### 9. Responsive Design - Tablet (768px - 1023px)
```
1. Set browser width to 800px
2. Verify: Three columns still visible
3. Verify: Reduced spacing (16px gap)
4. Verify: Columns fit comfortably
```

**Expected Result:** ✅ Tablet layout adapts properly

---

### 10. Responsive Design - Mobile (<768px)
```
1. Set browser width to 375px (iPhone size)
2. Verify: Columns stack vertically OR horizontal scroll enabled
3. Verify: No horizontal overflow issues
4. Verify: Touch targets adequate size (≥44px)
5. Verify: Text remains readable
```

**Expected Result:** ✅ Mobile layout is usable and accessible

---

## Accessibility Testing

### Keyboard Navigation
```
1. Tab through interface
   - Verify: Focus indicators visible
   - Verify: All interactive elements reachable
2. Press Tab to focus input field
3. Type task name, press Enter
   - Verify: Task created without mouse
```

**Expected Result:** ✅ Keyboard navigation works

---

### Screen Reader Compatibility
```
1. Enable screen reader (NVDA / JAWS / VoiceOver)
2. Navigate to board
3. Verify: Column names announced
4. Verify: Task details announced
5. Verify: Input fields have accessible labels
6. Verify: Error messages announced
```

**Expected Result:** ✅ Screen reader announces content correctly

---

### Color Contrast
```
1. Run Lighthouse accessibility audit
2. Verify: Score ≥90
3. Check priority badges contrast
4. Check text on colored backgrounds
```

**Expected Result:** ✅ WCAG AA contrast standards met

---

## Performance Testing

### Load Time
```
1. Open DevTools → Network tab
2. Hard refresh (Cmd+Shift+R / Ctrl+Shift+F5)
3. Check DOMContentLoaded time
4. Verify: < 1 second
```

**Expected Result:** ✅ Board loads quickly

---

### Drag Performance
```
1. Add 20+ tasks to board
2. Drag task across columns multiple times
3. Verify: No lag or stuttering
4. Verify: Smooth animations
```

**Expected Result:** ✅ Performance remains good with many tasks

---

## Cross-Browser Testing

Test in each browser:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

For each browser, verify:
- [ ] Board renders correctly
- [ ] Drag-and-drop works
- [ ] localStorage persists data
- [ ] No console errors

---

## Known Issues / Limitations

Document any discovered issues here:

```
Issue: [Description]
Severity: [Critical / High / Medium / Low]
Workaround: [If any]
Status: [Open / Fixed / Won't Fix]
```

---

## Final Sign-Off

### Build Validation
- [ ] `npm run build` completes successfully
- [ ] No TypeScript compilation errors
- [ ] Build size reasonable

### Test Validation
- [ ] `npm test -- --watchAll=false` all pass
- [ ] Test coverage ≥80%
- [ ] No test warnings

### Code Quality
- [ ] All components follow project conventions
- [ ] JSDoc comments present
- [ ] No console.log statements in production code
- [ ] Proper error handling implemented

### Deployment Readiness
- [ ] All exit criteria met
- [ ] All manual tests passed
- [ ] Accessibility audit passed (≥90)
- [ ] Cross-browser testing completed
- [ ] Performance acceptable

---

**Validated By:** _____________  
**Date:** _____________  
**Status:** ⬜ Passed / ⬜ Failed / ⬜ Passed with Minor Issues

**Notes:**
