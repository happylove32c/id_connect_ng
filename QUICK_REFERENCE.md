# Quick Reference Guide

Fast lookup guide for common tasks and patterns in the IDConnect project.

## Table of Contents

1. [Setup & Installation](#setup--installation)
2. [Running the App](#running-the-app)
3. [File Locations](#file-locations)
4. [Common Commands](#common-commands)
5. [Importing Modules](#importing-modules)
6. [React Patterns](#react-patterns)
7. [Tailwind Classes](#tailwind-classes)
8. [Icons (Lucide)](#icons-lucide)
9. [Supabase Methods](#supabase-methods)
10. [Error Messages](#error-messages)

---

## Setup & Installation

### First Time Setup
```bash
# Clone repo
git clone <url>
cd id_connect_ng

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Edit .env.local with your Supabase credentials
# VITE_SUPABASE_URL=...
# VITE_SUPABASE_ANON_KEY=...

# Start development
npm run dev
```

### Environment Variables
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

---

## Running the App

### Development
```bash
npm run dev
# Opens: http://localhost:5173
```

### Build
```bash
npm run build
# Creates: dist/ folder
```

### Preview Build
```bash
npm run preview
# Preview production build locally
```

### Lint Check
```bash
npm run lint
# Check for code quality issues

npm run lint -- --fix
# Auto-fix issues
```

---

## File Locations

### Core Files
| File | Purpose |
|------|---------|
| `src/App.jsx` | Main app component + routing |
| `src/main.jsx` | React entry point |
| `src/index.css` | Global styles |
| `supabaseClient.js` | Supabase configuration |
| `vite.config.js` | Build configuration |
| `package.json` | Dependencies |

### Pages
| File | Route | Purpose |
|------|-------|---------|
| `src/pages/AuthPage.jsx` | `/auth` | Login/Sign-up |
| `src/pages/Dashboard.jsx` | `/dashboard` | Main dashboard |
| `src/pages/Onboard.jsx` | - | Onboarding (unused) |

### Components
| File | Purpose |
|------|---------|
| `src/components/WelcomeBar.jsx` | Dashboard greeting |
| `src/components/Utility.jsx` | Service card |
| `src/modals/UtilityModal.jsx` | Detail modal |

### Context
| File | Exports |
|------|---------|
| `src/context/AuthContext.jsx` | `AuthProvider`, `useAuth()` |

---

## Common Commands

### Git Operations
```bash
# Create feature branch
git checkout -b feature/name

# Stage changes
git add .

# Commit changes
git commit -m "feat: description"

# Push changes
git push origin feature/name

# Update from main
git pull origin main
```

### npm Operations
```bash
# Install package
npm install package-name

# Install dev dependency
npm install --save-dev package-name

# Update all packages
npm update

# Check for vulnerabilities
npm audit
```

---

## Importing Modules

### React
```jsx
import React from "react";
import { useState, useEffect, useContext, memo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
```

### Supabase
```javascript
import { supabase } from "../supabaseClient";

// Authentication
supabase.auth.signUp(...)
supabase.auth.signInWithPassword(...)
supabase.auth.signInWithOAuth(...)
supabase.auth.getUser()
supabase.auth.signOut()
supabase.auth.onAuthStateChange(...)
```

### Icons (Lucide React)
```jsx
import { 
  Mail, 
  Lock, 
  Shield, 
  AlertCircle,
  ArrowRight,
  Bolt 
} from "lucide-react";

<Mail size={18} className="text-gray-400" />
```

### Context
```jsx
import { useAuth } from "../context/AuthContext";

const { user, loading } = useAuth();
```

---

## React Patterns

### State Management
```jsx
// useState
const [count, setCount] = useState(0);

// useEffect (run on mount)
useEffect(() => {
  console.log("Mounted");
  return () => console.log("Cleanup");
}, []);

// useEffect (run on dependency change)
useEffect(() => {
  console.log("Dependency changed:", dep);
}, [dep]);

// useContext
const { user } = useContext(AuthContext);
```

### Conditional Rendering
```jsx
// Simple condition
{isVisible && <Component />}

// Ternary
{isVisible ? <Component /> : <Fallback />}

// Multiple conditions
{isLoading && <Spinner />}
{error && <Error message={error} />}
{data && <Data data={data} />}
```

### Form Handling
```jsx
const [formData, setFormData] = useState({ email: "", password: "" });

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  // Process form
};

return (
  <form onSubmit={handleSubmit}>
    <input 
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      required
    />
  </form>
);
```

### Async Operations
```jsx
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

const handleAsync = async () => {
  setLoading(true);
  setError("");

  try {
    const result = await supabase.auth.signIn(...);
    // Handle success
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
```

---

## Tailwind Classes

### Layout
```jsx
className="flex"                    // flexbox
className="grid grid-cols-3"        // 3-column grid
className="w-full h-screen"         // Full width/height
className="max-w-md"                // Max width
className="p-4 px-6 py-2"           // Padding
className="m-4 mx-auto"             // Margin
```

### Responsive
```jsx
className="md:grid-cols-3"          // 3 cols on medium+
className="lg:text-lg"              // Large text on large+
className="hidden sm:block"         // Hide on small
className="block md:hidden"         // Show only on small
```

### Colors
```jsx
className="bg-white dark:bg-gray-900"
className="text-gray-900"
className="border-gray-300"
className="bg-blue-50 text-blue-700"
className="hover:bg-gray-800"
className="focus:ring-2 focus:ring-blue-500"
```

### Typography
```jsx
className="text-sm text-lg text-xl text-4xl"
className="font-medium font-bold font-semibold"
className="text-center"
className="truncate"                // Ellipsis
className="line-clamp-2"            // 2 lines max
```

### Shadows & Effects
```jsx
className="shadow-sm shadow-md shadow-lg shadow-xl"
className="rounded-lg rounded-2xl"
className="border border-gray-300"
className="transition"              // Smooth animation
className="opacity-50"              // 50% opacity
className="disabled:opacity-50"     // Disabled state
```

---

## Icons (Lucide)

### Import
```jsx
import { 
  Mail, 
  Lock, 
  Shield, 
  AlertCircle,
  ArrowRight,
  Bolt,
  // ... more icons
} from "lucide-react";
```

### Usage
```jsx
<Mail size={18} />                    // Size: 18px
<Shield size={16} className="text-blue-700" />
<AlertCircle size={16} />
<ArrowRight size={14} />
<Bolt size={24} />
```

### Common Icons in Project
| Icon | Use |
|------|-----|
| `Mail` | Email input |
| `Lock` | Password input |
| `Shield` | Security/trust |
| `AlertCircle` | Errors |
| `ArrowRight` | Links/CTAs |
| `Bolt` | Utilities/services |

### More Icons Available
Visit [lucide.dev](https://lucide.dev) for full icon list

---

## Supabase Methods

### Authentication

**Sign Up**
```javascript
const { error } = await supabase.auth.signUp({
  email: "user@example.com",
  password: "password123"
});
```

**Sign In**
```javascript
const { error } = await supabase.auth.signInWithPassword({
  email: "user@example.com",
  password: "password123"
});
```

**Sign In with OAuth**
```javascript
const { error } = await supabase.auth.signInWithOAuth({
  provider: "google",
  options: { redirectTo: window.location.origin + "/dashboard" }
});
```

**Get Current User**
```javascript
const { data } = await supabase.auth.getUser();
const user = data?.user;
```

**Sign Out**
```javascript
const { error } = await supabase.auth.signOut();
```

**Listen to Auth Changes**
```javascript
const { data: listener } = supabase.auth.onAuthStateChange(
  (event, session) => {
    // Handle changes
  }
);

// Cleanup
listener.subscription.unsubscribe();
```

---

## Error Messages

### Common Errors & Solutions

| Error | Cause | Fix |
|-------|-------|-----|
| "Invalid login credentials" | Wrong email/password | Check credentials |
| "User already registered" | Email exists | Use different email |
| "Email not confirmed" | Not verified | Check email link |
| "Password should be at least 6 characters" | Too short | Use longer password |
| "Invalid email" | Bad format | Use valid email |
| "Cannot read property 'user'" | No data returned | Check error first |
| "Cannot find module" | Import path wrong | Check file location |
| "Class does not exist" | Tailwind class typo | Verify class name |

### Handling Errors
```javascript
try {
  const result = await supabase.auth.signIn(...);
  if (result.error) {
    console.error("Auth error:", result.error.message);
    setError(result.error.message);
  } else {
    // Success
  }
} catch (err) {
  console.error("Unexpected error:", err);
  setError("An unexpected error occurred");
}
```

### Debug Checklist
- [ ] Check browser console for errors
- [ ] Check network tab for failed requests
- [ ] Verify environment variables are set
- [ ] Restart dev server if changed `.env.local`
- [ ] Check Supabase dashboard for logs
- [ ] Verify user exists in Supabase auth
- [ ] Check if email is verified

---

## Quick Tips

### Restart Dev Server
```bash
# When:
# - Changed .env.local
# - Installed new packages
# - Persistent weird errors

# Do:
npm run dev
# Ctrl+C to stop, then rerun
```

### Clear Cache
```bash
# When styles not updating or weird build issues
rm -rf .vite
npm run dev
```

### Check Supabase Status
```
1. Go to https://status.supabase.com
2. Check if services are operational
3. Check your region status
```

### View React DevTools
```
1. Install React DevTools browser extension
2. Open DevTools (F12)
3. Go to "Components" tab
4. Browse component tree
5. Inspect props and state
```

### Test API Calls Locally
```javascript
// In browser console:
import { supabase } from './supabaseClient.js'
const { data } = await supabase.auth.getUser()
console.log(data)
```

---

## Resources

- **React Docs**: https://react.dev
- **Tailwind**: https://tailwindcss.com
- **Lucide Icons**: https://lucide.dev
- **Supabase**: https://supabase.com/docs
- **Vite**: https://vitejs.dev

---

**Last Updated**: March 27, 2026
**Version**: 1.0
