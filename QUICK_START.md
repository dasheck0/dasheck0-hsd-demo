# Sprint Planner Board - Quick Start Guide

## 🚀 Run the Application

```bash
# Start development server
npm start

# Application opens at http://localhost:3000
```

## 🧪 Run Tests

```bash
# Run all tests once
npm test -- --watchAll=false

# Run with coverage report
npm test -- --watchAll=false --coverage

# Run specific test
npm test -- TaskCard.test
```

## 🔨 Build for Production

```bash
# Create production build
npm run build

# Output in /build directory
```

## 🎯 Quick Validation Steps

### 1. First Load
- Clear localStorage in DevTools
- Refresh page
- ✅ Should see 5 demo tasks

### 2. Add Task
- Type task name in "Add new task..." input
- Click Add or press Enter
- ✅ Task appears in Todo column

### 3. Drag Task
- Click and hold a task card
- Drag to another column
- ✅ Task moves to new column

### 4. Persistence
- Add or move tasks
- Refresh page (Cmd+R)
- ✅ All changes preserved

### 5. Responsive
- Resize browser window
- Desktop: 3 columns side-by-side
- Mobile: Columns stack vertically
- ✅ Layout adapts

## 📊 Test Results Expected

```bash
npm test -- --watchAll=false
```

**Expected:** 68 tests pass (0 failures)

```bash
npm run build
```

**Expected:** Builds successfully with no errors

## 🐛 Troubleshooting

### Tests Fail
```bash
# Clear jest cache
npm test -- --clearCache

# Run again
npm test -- --watchAll=false
```

### TypeScript Errors
```bash
# Check for issues
npm run build

# Look for red error messages
```

### localStorage Not Working
```bash
# Open DevTools → Console
# Check for errors mentioning "localStorage"
# Ensure not in private/incognito mode
```

## 📋 Files to Review

| File | Purpose |
|------|---------|
| `IMPLEMENTATION_SUMMARY.md` | Complete overview |
| `VALIDATION_CHECKLIST.md` | Detailed test steps |
| `src/components/SprintBoard.tsx` | Main board logic |
| `src/utils/taskStorage.ts` | localStorage handling |

## ✅ Success Checklist

- [ ] `npm start` runs without errors
- [ ] Demo tasks appear on first load
- [ ] Can add new tasks
- [ ] Can drag tasks between columns
- [ ] Tasks persist after refresh
- [ ] `npm test -- --watchAll=false` passes all tests
- [ ] `npm run build` succeeds
- [ ] No console errors in browser

---

**Status:** Implementation complete, ready for validation  
**Next:** Follow VALIDATION_CHECKLIST.md for comprehensive testing
