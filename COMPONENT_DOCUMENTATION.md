# Component Documentation

This document provides detailed documentation for all React components in the IDConnect application.

## Table of Contents

1. [Pages](#pages)
2. [Components](#components)
3. [Modals](#modals)
4. [Context](#context)
5. [Utilities](#utilities)

---

## Pages

### AuthPage.jsx

**Location**: `src/pages/AuthPage.jsx`

**Purpose**: Handles user authentication (login and sign-up)

**Component Type**: Functional Component

#### Props
None - This is a page component loaded via routing

#### State Variables

| State | Type | Purpose |
|-------|------|---------|
| `isLogin` | boolean | Toggles between login and sign-up modes |
| `loading` | boolean | Loading state during API calls |
| `formData` | object | { email: string, password: string } |
| `error` | string | Error message display |
| `message` | string | Success message display |

#### Key Methods

##### `handleChange(e)`
Updates form data on input change and clears errors.
```jsx
const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
  setError("");
};
```

##### `handleEmailLogin(e)`
Authenticates user with email and password using Supabase.
- **Parameters**: Event object
- **On Success**: Redirects to `/dashboard`
- **On Error**: Displays error message

```jsx
const handleEmailLogin = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  });

  if (error) {
    setError(error.message);
    setLoading(false);
  } else {
    window.location.href = "/dashboard";
  }
};
```

##### `handleSignup(e)`
Registers a new user with email and password.
- **Parameters**: Event object
- **On Success**: Shows confirmation message
- **On Error**: Displays error message

```jsx
const handleSignup = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");
  setMessage("");

  const { error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
  });

  if (error) {
    setError(error.message);
    setLoading(false);
  } else {
    setMessage("Check your email to confirm your account.");
    setLoading(false);
  }
};
```

##### `signInWithGoogle()`
Initiates Google OAuth flow.
- **On Success**: Redirects to `/dashboard`
- **On Error**: Displays error message

```jsx
const signInWithGoogle = async () => {
  setLoading(true);

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: window.location.origin + "/dashboard",
    },
  });

  if (error) {
    setError(error.message);
    setLoading(false);
  }
};
```

##### `toggleMode()`
Switches between login and sign-up modes.

```jsx
const toggleMode = () => {
  setIsLogin(!isLogin);
  setError("");
  setMessage("");
};
```

#### UI Structure

- **Background**: Gradient background with glassmorphism effect
- **Header**: IDConnect branding with security badge
- **Form**: Email and password inputs with icons
- **Submit Button**: Dynamic text based on mode (Sign In/Sign Up)
- **Mode Toggle**: Switch between login and registration
- **OAuth**: Google sign-in button
- **Footer**: Terms of Service and Privacy Policy links

#### Dependencies

- `react`: Core React library
- `lucide-react`: Icons (Shield, Mail, Lock, AlertCircle)
- `supabaseClient`: Supabase authentication client

#### Styling

- Tailwind CSS utility classes
- Focus states for accessibility
- Disabled states during loading
- Responsive design for mobile and desktop

---

### Dashboard.jsx

**Location**: `src/pages/Dashboard.jsx`

**Purpose**: Main user dashboard (protected route)

**Component Type**: Functional Component with protected route

#### Props
None - Protected by route guard

#### State Variables
None - Manages data from child components

#### Key Methods

##### `useEffect()`
Cleans up URL hash from OAuth redirects.

```jsx
useEffect(() => {
  if (window.location.hash) {
    window.history.replaceState(null, "", window.location.pathname);
  }
}, []);
```

##### `handleLogout()`
Signs out the current user (currently unused in UI).

```jsx
const handleLogout = async () => {
  await supabase.auth.signOut();
};
```

#### Child Components

- `WelcomeBar`: Displays personalized greeting and dashboard title
- `Utility`: Service card for utility bills

#### UI Structure

- **Background**: Light gray background
- **Welcome Section**: Greeting with user's name
- **Services Grid**: Responsive grid layout (3 columns on desktop)
- **Service Cards**: Utility and other government services

#### Dependencies

- `react`: Core React library
- `lucide-react`: Icons
- `supabaseClient`: For logout functionality
- `WelcomeBar`: Custom component
- `Utility`: Custom component

---

### Onboard.jsx

**Location**: `src/pages/Onboard.jsx`

**Purpose**: Onboarding page for new users (stub)

**Note**: Currently not fully implemented in routing

---

## Components

### WelcomeBar.jsx

**Location**: `src/components/WelcomeBar.jsx`

**Purpose**: Dashboard header showing personalized user greeting

**Component Type**: Functional Component

#### Props
None - Accesses auth data directly from Supabase

#### State Variables

| State | Type | Purpose |
|-------|------|---------|
| `name` | string | User's first name to display |

#### Key Methods

##### `useEffect()`
Fetches user data from Supabase auth on component mount.

```jsx
useEffect(() => {
  const getUser = async () => {
    const { data } = await supabase.auth.getUser();
    const user = data?.user;

    if (user) {
      const fullName =
        user.user_metadata?.full_name ||
        user.user_metadata?.name ||
        user.email;

      const firstName = fullName.split(" ")[0];
      setName(firstName);
    }
  };

  getUser();
}, []);
```

#### UI Structure

- **Security Badge**: Blue pill-shaped badge with "Secure Dashboard" text
- **Greeting**: Large heading with user's first name and wave emoji
- **Description**: Subtitle describing the dashboard purpose

#### Dependencies

- `react`: Core React library
- `supabaseClient`: For user data retrieval

#### Styling

- Gradient text for heading
- Responsive padding
- Consistent spacing with Tailwind CSS

---

### Utility.jsx

**Location**: `src/components/Utility.jsx`

**Purpose**: Display utility bill service card with interactive modal

**Component Type**: Functional Component

#### Props
None - Currently uses hardcoded data

#### State Variables

| State | Type | Purpose |
|-------|------|---------|
| `open` | boolean | Controls modal visibility |

#### Local Data

```javascript
const lastPayment = {
  amount: 5000,      // in naira
  date: "2024-05-01"
};
```

#### Key Methods

##### UI Event Handlers

- `onClick={() => setOpen(true)}`: Opens utility details modal
- `onClose={() => setOpen(false)}`: Closes modal

#### UI Structure

- **Card Container**: White background with hover effects
- **Icon**: Blue Bolt icon in rounded container
- **Title**: "Utility Bills"
- **Content**: Last payment amount and date
- **CTA Button**: "View Details" with arrow icon
- **Modal**: Opens on button click (UtilityModal component)

#### Dependencies

- `react`: Core React library
- `lucide-react`: Icons (ArrowRight, Bolt)
- `UtilityModal`: Custom modal component

#### Styling

- Hover effects with shadow and border changes
- Animated arrow icon on hover
- Responsive button styling
- Group hover states for consistent interaction

---

## Modals

### UtilityModal.jsx

**Location**: `src/modals/UtilityModal.jsx`

**Purpose**: Display detailed utility bill information in a modal dialog

**Component Type**: Functional Component

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `open` | boolean | Yes | Controls modal visibility |
| `onClose` | function | Yes | Callback to close modal |
| `lastPayment` | object | Yes | { amount: number, date: string } |

#### Usage Example

```jsx
<UtilityModal 
  open={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  lastPayment={{ amount: 5000, date: "2024-05-01" }}
/>
```

**Note**: Check the actual file for current implementation details

---

## Context

### AuthContext.jsx

**Location**: `src/context/AuthContext.jsx`

**Purpose**: Manages global authentication state

**Component Type**: Context Provider

#### Context Value

```typescript
{
  user: User | null,        // Current authenticated user
  loading: boolean          // Auth state being loaded
}
```

#### Provider Component

```jsx
export const AuthProvider = ({ children }) => {
  // Initialization and effect handling
  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
```

#### Hook

```jsx
export const useAuth = () => useContext(AuthContext);
```

#### How It Works

1. **Initialization**: On mount, checks current user session
```javascript
supabase.auth.getUser().then(({ data }) => {
  setUser(data.user);
  setLoading(false);
});
```

2. **Listener**: Sets up real-time auth state changes
```javascript
const { data: listener } = supabase.auth.onAuthStateChange(
  (_, session) => {
    setUser(session?.user || null);
  }
);
```

3. **Cleanup**: Unsubscribes from listener on unmount

#### Usage in Components

```jsx
import { useAuth } from './context/AuthContext';

function MyComponent() {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  
  return <div>{user ? user.email : 'Not logged in'}</div>;
}
```

#### State Variables

| State | Type | Purpose |
|-------|------|---------|
| `user` | User \| null | Current authenticated user object |
| `loading` | boolean | Whether auth check is in progress |

#### Key Methods

##### `useEffect()`
Handles initial auth check and listener setup.

```javascript
useEffect(() => {
  // Get initial user
  supabase.auth.getUser().then(({ data }) => {
    setUser(data.user);
    setLoading(false);
  });

  // Listen for auth changes
  const { data: listener } = supabase.auth.onAuthStateChange(
    (_, session) => {
      setUser(session?.user || null);
    }
  );

  // Cleanup
  return () => listener.subscription.unsubscribe();
}, []);
```

#### Dependencies

- `supabaseClient`: Supabase auth instance
- `react`: createContext, useContext, useEffect, useState

---

## Utilities

### supabaseClient.js

**Location**: `supabaseClient.js`

**Purpose**: Initialize and export Supabase client for backend integration

#### Code

```javascript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
```

#### Usage

```javascript
import { supabase } from './supabaseClient';

// Authentication
await supabase.auth.signInWithPassword({ email, password });

// Get current user
const { data } = await supabase.auth.getUser();

// Sign out
await supabase.auth.signOut();
```

#### Environment Variables Required

- `VITE_SUPABASE_URL`: Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Supabase anonymous key

---

### interswitchClient.js

**Location**: `interswitchClient.js`

**Purpose**: Integration with Interswitch payment gateway

**Note**: Check file for implementation details

---

## Component Hierarchy

```
App.jsx
├── BrowserRouter
│   └── Routes
│       ├── Route /auth
│       │   └── PublicRoute
│       │       └── AuthPage
│       │           └── (Icons from lucide-react)
│       │
│       ├── Route /dashboard
│       │   └── ProtectedRoute
│       │       └── Dashboard
│       │           ├── WelcomeBar
│       │           │   └── (Supabase user fetch)
│       │           └── Utility
│       │               └── UtilityModal
│       │
│       └── Route *
│           └── Navigate to /dashboard
│
└── AuthProvider (wraps entire app)
    └── (Provides user, loading context)
```

---

## Common Patterns

### Protected Route Pattern

```jsx
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) return <p>Loading...</p>;
  return user ? children : <Navigate to="/auth" />;
}
```

### Async State Management

```jsx
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

const handleAsync = async () => {
  setLoading(true);
  setError("");
  
  try {
    const result = await someAsyncFunction();
    // Handle success
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
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
```

---

**Last Updated**: March 27, 2026
