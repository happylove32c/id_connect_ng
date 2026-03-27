# Development Guide

This document provides guidelines for developing new features and maintaining the IDConnect application.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Development Workflow](#development-workflow)
3. [Code Structure](#code-structure)
4. [Styling Guidelines](#styling-guidelines)
5. [Component Development](#component-development)
6. [State Management](#state-management)
7. [Testing Guide](#testing-guide)
8. [Debugging](#debugging)
9. [Git Workflow](#git-workflow)
10. [Performance Tips](#performance-tips)
11. [Accessibility](#accessibility)

---

## Getting Started

### Prerequisites

- Node.js 16 or higher
- npm or yarn
- Git
- Text editor (VS Code recommended)
- Supabase account

### Initial Setup

```bash
# Clone repository
git clone <repository-url>
cd id_connect_ng

# Install dependencies
npm install

# Create environment file
touch .env.local

# Add environment variables
echo "VITE_SUPABASE_URL=<your-url>" >> .env.local
echo "VITE_SUPABASE_ANON_KEY=<your-key>" >> .env.local

# Start development server
npm run dev
```

### Verify Setup

Visit `http://localhost:5173` in your browser. You should see:
- IDConnect authentication page
- Ability to sign up/login
- Redirect to dashboard on success

---

## Development Workflow

### Daily Development

```bash
# 1. Ensure you're on the latest code
git pull origin main

# 2. Create feature branch
git checkout -b feature/your-feature-name

# 3. Start dev server (if not already running)
npm run dev

# 4. Make your changes
# - Edit components/files
# - Test in browser
# - Check console for errors

# 5. Run linter
npm run lint

# 6. Fix any lint errors
npm run lint -- --fix

# 7. Commit changes
git add .
git commit -m "feat: description of changes"

# 8. Push branch
git push origin feature/your-feature-name

# 9. Create pull request on GitHub
```

### Hot Reload

Vite provides instant hot reload:
- Save a file → Page updates instantly
- State is preserved when possible
- No full page refresh needed

---

## Code Structure

### Directory Organization

```
src/
├── pages/           # Full page components (routes)
├── components/      # Reusable UI components
├── context/         # React Context providers
├── modals/          # Modal dialog components
├── hooks/           # Custom React hooks (future)
├── utils/           # Utility functions (future)
├── styles/          # Global styles (future)
└── types/           # TypeScript types (future)
```

### File Naming Conventions

- **Components**: PascalCase (e.g., `UserProfile.jsx`)
- **Hooks**: camelCase with "use" prefix (e.g., `useAuth.js`)
- **Utilities**: camelCase (e.g., `formatDate.js`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS.js`)

### File Organization

Each component should follow this structure:

```jsx
// 1. Imports
import React, { useState, useEffect } from "react";
import { IconName } from "lucide-react";
import { supabase } from "../../supabaseClient";

// 2. Component definition
function MyComponent({ prop1, prop2 }) {
  // 3. State
  const [state, setState] = useState(null);

  // 4. Effects
  useEffect(() => {
    // Setup
    return () => {
      // Cleanup
    };
  }, []);

  // 5. Event handlers
  const handleEvent = (e) => {
    // Handle event
  };

  // 6. Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
}

// 7. Export
export default MyComponent;
```

---

## Styling Guidelines

### Tailwind CSS

The project uses Tailwind CSS for styling. Always prefer utility classes over custom CSS.

#### Common Patterns

**Responsive Design**:
```jsx
<div className="grid md:grid-cols-3 gap-6">
  {/* Mobile: 1 column, Desktop: 3 columns */}
</div>
```

**Hover States**:
```jsx
<button className="bg-blue-500 hover:bg-blue-600 transition">
  Click me
</button>
```

**Focus States** (accessibility):
```jsx
<input className="focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
```

**Dark Mode** (if implementing):
```jsx
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  Content
</div>
```

### Icon Library

Use Lucide React for all icons:

```jsx
import { Mail, Lock, ArrowRight, Bolt } from "lucide-react";

// Usage
<Mail size={18} className="text-gray-400" />
```

**Common Icons in Project**:
- `Shield`: Security/protection
- `Mail`: Email
- `Lock`: Password
- `AlertCircle`: Errors
- `Bolt`: Utilities
- `ArrowRight`: CTAs

### Custom CSS

Minimize custom CSS. If needed, add to `index.css`:

```css
/* Only use for truly custom styles */
.custom-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

---

## Component Development

### Creating a New Component

1. **Create file** in appropriate directory:
```bash
touch src/components/MyComponent.jsx
```

2. **Write component**:
```jsx
import React from "react";

function MyComponent({ title, onAction }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-semibold">{title}</h2>
      <button 
        onClick={onAction}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Action
      </button>
    </div>
  );
}

export default MyComponent;
```

3. **Import and use**:
```jsx
import MyComponent from "./components/MyComponent";

function App() {
  return (
    <MyComponent 
      title="Welcome"
      onAction={() => console.log("Clicked")}
    />
  );
}
```

### Component Best Practices

1. **Keep components small**
   - Single responsibility
   - Easier to test and reuse
   - Easier to understand

2. **Use props properly**
```jsx
// Good
function Card({ title, description, onClick }) {
  return <div onClick={onClick}>{title}</div>;
}

// Avoid
function Card(props) {
  return <div onClick={props.onClick}>{props.title}</div>;
}
```

3. **Handle loading states**
```jsx
function DataDisplay({ data, loading, error }) {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return <div>{data}</div>;
}
```

4. **Conditional rendering**
```jsx
// Good
{isVisible && <Component />}

// Good
{isVisible ? <Component /> : null}

// Avoid
{isVisible === true && <Component />}
```

---

## State Management

### Local Component State

Use `useState` for component-specific state:

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

### Global State with Context

Use context for state needed across components:

```jsx
// Create context
const MyContext = createContext();

// Provider component
export function MyProvider({ children }) {
  const [value, setValue] = useState(null);

  return (
    <MyContext.Provider value={{ value, setValue }}>
      {children}
    </MyContext.Provider>
  );
}

// Custom hook
export const useMyContext = () => useContext(MyContext);

// Usage
function MyComponent() {
  const { value, setValue } = useMyContext();
  return <div>{value}</div>;
}
```

### Authentication State

Always use the provided `AuthContext`:

```jsx
import { useAuth } from "../context/AuthContext";

function ProtectedComponent() {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Not authenticated</p>;

  return <div>Welcome, {user.email}</div>;
}
```

---

## Testing Guide

### Manual Testing Checklist

Before pushing changes, test:

- [ ] Page loads without errors
- [ ] Console has no errors
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] All interactive elements work
- [ ] Form validation works
- [ ] API calls complete successfully
- [ ] Error states display correctly
- [ ] Loading states show appropriately

### Testing Authentication

```javascript
// Test sign up
1. Go to /auth
2. Switch to sign up mode
3. Enter email and password
4. Check email for verification link
5. Verify email
6. Sign in with credentials

// Test Google OAuth
1. Click "Continue with Google"
2. Authenticate with Google
3. Should redirect to /dashboard
4. User name should display in WelcomeBar

// Test protected routes
1. Sign out
2. Try to visit /dashboard directly
3. Should redirect to /auth
4. Sign in
5. Should be able to access /dashboard
```

### Testing Form Inputs

```javascript
// Test email validation
- Valid: user@example.com
- Invalid: invalid-email
- Invalid: user@
- Invalid: @example.com

// Test password requirements
- Too short: 12345
- Valid: MyPassword123
- Valid: Very-Long-Password-123
```

---

## Debugging

### Browser DevTools

1. **Console Tab**
   - Check for error messages
   - Use `console.log()` for debugging
   - Avoid console errors in production

2. **Network Tab**
   - Check API requests
   - Verify response status
   - Check request/response headers

3. **Application Tab**
   - View localStorage/sessionStorage
   - Check cookies
   - View IndexedDB

### React DevTools Extension

Install React DevTools browser extension:

```javascript
// View component props
// Inspect component tree
// Track state changes
```

### Common Debugging Patterns

```jsx
// Log state changes
console.log("User updated:", user);

// Log API responses
const { error } = await supabase.auth.signUp(...);
console.log("Auth response:", error);

// Debug render cycles
useEffect(() => {
  console.log("Component mounted or dependency changed");
}, [dependency]);

// Check if condition is true
if (debugMode) console.log("Debug info:", data);
```

### Network Request Debugging

```javascript
// Check Supabase requests
// 1. Open DevTools Network tab
// 2. Filter by "Fetch/XHR"
// 3. Look for api.supabase.co requests
// 4. Check response status and body
```

---

## Git Workflow

### Branch Naming

```
feature/description           # New feature
bugfix/issue-description      # Bug fix
refactor/what-changed         # Code refactoring
docs/what-was-documented      # Documentation
```

### Commit Messages

Follow conventional commits:

```
feat: add user profile page
fix: correct authentication error handling
docs: update API documentation
refactor: simplify component structure
```

### Pull Request Process

1. **Create feature branch**
```bash
git checkout -b feature/my-feature
```

2. **Make commits**
```bash
git add .
git commit -m "feat: add feature"
```

3. **Push branch**
```bash
git push origin feature/my-feature
```

4. **Create PR on GitHub**
   - Write clear description
   - Reference any related issues
   - Add screenshots if UI changes

5. **Code review**
   - Address feedback
   - Make updates
   - Request re-review

6. **Merge**
   - Squash or rebase if requested
   - Delete branch after merge

---

## Performance Tips

### React Optimization

1. **Memoize components**
```jsx
import { memo } from "react";

const MyComponent = memo(function MyComponent({ data }) {
  return <div>{data}</div>;
});

export default MyComponent;
```

2. **Use useCallback for functions**
```jsx
const handleClick = useCallback(() => {
  doSomething();
}, [dependency]);
```

3. **Lazy load components**
```jsx
import { lazy, Suspense } from "react";

const Dashboard = lazy(() => import("./pages/Dashboard"));

<Suspense fallback={<p>Loading...</p>}>
  <Dashboard />
</Suspense>
```

### Build Optimization

```bash
# Check build size
npm run build

# Analyze bundle
# Use tools like bundlesize or webpack-bundle-analyzer
```

### Network Optimization

1. **Minimize API calls**
   - Cache responses
   - Batch operations
   - Debounce user input

2. **Optimize images**
   - Use next-gen formats (WebP)
   - Compress images
   - Use appropriate sizes

---

## Accessibility (a11y)

### HTML Semantics

```jsx
// Good
<button onClick={handleClick}>Click me</button>

// Avoid
<div onClick={handleClick}>Click me</div>
```

### Form Labels

```jsx
// Good
<label htmlFor="email">Email</label>
<input id="email" type="email" />

// Avoid
<input type="email" placeholder="Email" />
```

### Focus Management

```jsx
// Good - visible focus
<button className="focus:ring-2 focus:ring-blue-500">
  Click
</button>

// Good - keyboard navigation
<div role="navigation" onKeyDown={handleKeydown}>
  Items
</div>
```

### ARIA Attributes

```jsx
// Loading state
<div aria-busy="true" aria-label="Loading">
  <Spinner />
</div>

// Error message
<p role="alert" className="text-red-600">
  {error}
</p>

// Modal
<div role="dialog" aria-modal="true" aria-labelledby="title">
  <h2 id="title">Modal Title</h2>
</div>
```

### Color Contrast

- Ensure sufficient contrast ratio (WCAG AA: 4.5:1 for text)
- Don't rely on color alone to convey information
- Use icons and text together

---

## Troubleshooting

### Common Issues

**Issue**: Dev server won't start
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
npm run dev
```

**Issue**: Changes not reflecting
```bash
# Clear Vite cache
rm -rf .vite
npm run dev
```

**Issue**: Authentication not working
- Check `.env.local` is configured
- Verify Supabase keys are correct
- Check browser console for errors

**Issue**: Tailwind styles not applying
- Check class names are spelled correctly
- Ensure HTML structure is correct
- Restart dev server

---

## Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev)
- [Supabase Docs](https://supabase.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)

---

**Last Updated**: March 27, 2026
