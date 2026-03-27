# API and Supabase Integration Guide

This document covers the backend integration with Supabase and any external APIs used in the IDConnect application.

## Table of Contents

1. [Supabase Setup](#supabase-setup)
2. [Authentication API](#authentication-api)
3. [Real-time Features](#real-time-features)
4. [Environment Configuration](#environment-configuration)
5. [Error Handling](#error-handling)
6. [Best Practices](#best-practices)

---

## Supabase Setup

### What is Supabase?

Supabase is an open-source Firebase alternative that provides:
- Authentication (Email, OAuth providers)
- PostgreSQL Database
- Real-time listeners
- Row-level security
- File storage

### Project Setup

1. **Create a Supabase Account**
   - Go to [supabase.com](https://supabase.com)
   - Sign up with email or GitHub

2. **Create a New Project**
   - Choose a project name (e.g., "id_connect_ng")
   - Select a region closest to your users
   - Set a secure database password

3. **Get Your Credentials**
   - Navigate to Settings > API
   - Copy `Project URL` → `VITE_SUPABASE_URL`
   - Copy `anon public` key → `VITE_SUPABASE_ANON_KEY`

4. **Configure OAuth Providers**
   - Go to Authentication > Providers
   - Enable Google provider
   - Add OAuth credentials from Google Cloud Console

### Initial Configuration

```javascript
// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
```

---

## Authentication API

### Email/Password Authentication

#### Sign Up

**Function**: `supabase.auth.signUp()`

**Parameters**:
```javascript
{
  email: string,      // User's email address
  password: string    // Minimum 6 characters recommended
}
```

**Response**:
```javascript
{
  data: { user: User, session: Session },
  error: { message: string }
}
```

**Usage in AuthPage.jsx**:
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

**Error Handling**:
- "User already registered" - Email exists
- "Password should be at least 6 characters" - Password too short
- "Invalid email" - Email format invalid

#### Sign In

**Function**: `supabase.auth.signInWithPassword()`

**Parameters**:
```javascript
{
  email: string,
  password: string
}
```

**Response**:
```javascript
{
  data: { user: User, session: Session },
  error: { message: string }
}
```

**Usage in AuthPage.jsx**:
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

**Common Errors**:
- "Invalid login credentials" - Wrong email or password
- "Email not confirmed" - User hasn't verified email

#### Sign Out

**Function**: `supabase.auth.signOut()`

**Response**:
```javascript
{ error: null }
```

**Usage**:
```javascript
const handleLogout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Logout error:", error.message);
  }
  // Redirect to /auth
};
```

---

### OAuth Authentication

#### Google Sign In

**Function**: `supabase.auth.signInWithOAuth()`

**Parameters**:
```javascript
{
  provider: "google",  // Other options: "github", "gitlab", etc.
  options: {
    redirectTo: string  // URL to redirect after auth
  }
}
```

**Usage in AuthPage.jsx**:
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

**Configuration Steps**:

1. **Google Cloud Console Setup**
   - Go to Google Cloud Console
   - Create OAuth 2.0 credentials (Web application)
   - Add authorized redirect URIs:
     - `https://YOUR_SUPABASE_URL/auth/v1/callback`
   - Copy Client ID and Client Secret

2. **Supabase Provider Setup**
   - Settings > Authentication > Providers > Google
   - Paste Client ID and Client Secret
   - Save

3. **Redirect URL Configuration**
   - After OAuth, user is redirected to `redirectTo` URL
   - Configure in Supabase Authentication settings
   - Must match domain exactly

**Redirect Flow**:
```
User clicks "Continue with Google"
  ↓
Redirected to Google login
  ↓
User grants permissions
  ↓
Redirected to redirectTo URL
  ↓
Session created automatically
  ↓
Redirected to /dashboard
```

---

### User Information

#### Get Current User

**Function**: `supabase.auth.getUser()`

**Response**:
```javascript
{
  data: {
    user: {
      id: string,
      email: string,
      email_confirmed_at: string,
      user_metadata: {
        // Custom fields
        full_name: string,
        picture: string,
        name: string
      },
      identities: Array,
      created_at: string,
      updated_at: string
    }
  },
  error: null
}
```

**Usage in WelcomeBar.jsx**:
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

#### Listen to Auth State Changes

**Function**: `supabase.auth.onAuthStateChange()`

**Callback Parameters**:
```javascript
(event, session) => {
  // event: "SIGNED_IN", "SIGNED_OUT", "TOKEN_REFRESHED"
  // session: Current session object
}
```

**Usage in AuthContext.jsx**:
```jsx
const { data: listener } = supabase.auth.onAuthStateChange(
  (_, session) => {
    setUser(session?.user || null);
  }
);

// Cleanup
return () => listener.subscription.unsubscribe();
```

---

## Real-time Features

### Auth State Listener

The app uses real-time listeners to maintain session state:

```javascript
supabase.auth.onAuthStateChange((event, session) => {
  // Triggered when:
  // 1. User signs in
  // 2. User signs out
  // 3. Token is refreshed
  // 4. Session changes from another tab
  
  setUser(session?.user || null);
});
```

**Benefits**:
- Users stay signed in across page reloads
- Multi-tab session sync
- Automatic token refresh
- Real-time auth state updates

### Setting Up Real-time Database

To enable real-time database subscriptions:

```javascript
// Listen to table changes
const subscription = supabase
  .from('users')
  .on('*', payload => {
    console.log('Change received!', payload);
  })
  .subscribe();

// Cleanup
subscription.unsubscribe();
```

---

## Environment Configuration

### Environment Variables

**File**: `.env.local` (create in project root)

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here

# Optional for production
VITE_API_TIMEOUT=5000
VITE_LOG_LEVEL=error
```

### Vite Environment Variables

Vite prefixes with `VITE_` to expose variables to frontend:

```javascript
// Access in code
import.meta.env.VITE_SUPABASE_URL
import.meta.env.VITE_SUPABASE_ANON_KEY
```

### Development vs Production

**Development** (.env.local):
```env
VITE_SUPABASE_URL=http://localhost:54321
VITE_SUPABASE_ANON_KEY=local_key
```

**Production** (.env.production):
```env
VITE_SUPABASE_URL=https://prod-project.supabase.co
VITE_SUPABASE_ANON_KEY=prod_key
```

---

## Error Handling

### Common Authentication Errors

| Error | Cause | Solution |
|-------|-------|----------|
| "Invalid login credentials" | Wrong email/password | Check credentials |
| "User already registered" | Email exists | Use different email |
| "Email not confirmed" | User hasn't verified email | Send verification email |
| "Password should be at least 6 characters" | Password too short | Use longer password |
| "Invalid email" | Email format wrong | Enter valid email |
| "Unexpected end of JSON input" | Network error | Retry, check connection |

### Error Handling Pattern

```javascript
const handleAuth = async () => {
  setLoading(true);
  setError("");

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  });

  if (error) {
    // User-friendly error messages
    if (error.message.includes("Invalid")) {
      setError("Email or password is incorrect");
    } else if (error.message.includes("not confirmed")) {
      setError("Please verify your email first");
    } else {
      setError(error.message);
    }
    setLoading(false);
  } else {
    // Success handling
    window.location.href = "/dashboard";
  }
};
```

### Debugging Tips

1. **Check Browser Console**
   - Open DevTools → Console
   - Look for detailed error messages

2. **Check Supabase Logs**
   - Go to Supabase Dashboard
   - Navigation → Logs
   - Filter by error level

3. **Test with Supabase Studio**
   - SQL Editor → Write test queries
   - Auth dashboard → View users

4. **Network Tab**
   - DevTools → Network
   - Check API request/response

---

## Best Practices

### Security

1. **Never expose secret keys**
   - Only use `anon` key in frontend
   - Keep service role key secret

2. **Environment variables**
   - Never commit `.env.local` to git
   - Add to `.gitignore`

3. **Row-level security (RLS)**
   - Enable on all tables
   - Define policies based on user ID

4. **HTTPS only**
   - Always use HTTPS in production
   - OAuth requires HTTPS

### Performance

1. **Cache user data**
   ```javascript
   // Instead of fetching every render
   const user = useAuth().user;
   ```

2. **Minimize API calls**
   - Use context for global state
   - Batch operations when possible

3. **Handle loading states**
   - Always show loading indicator
   - Prevent duplicate submissions

### Code Organization

1. **Centralize Supabase client**
   ```javascript
   // supabaseClient.js
   export const supabase = createClient(url, key);
   ```

2. **Create custom hooks**
   ```javascript
   // hooks/useAuth.js
   export const useAuth = () => useContext(AuthContext);
   ```

3. **Separate concerns**
   - API calls in utility functions
   - Components for UI logic
   - Context for global state

### Testing

1. **Test auth flows**
   - Sign up with new email
   - Sign in with existing account
   - Google OAuth redirect
   - Error messages

2. **Test edge cases**
   - Network failures
   - Slow network (throttle in DevTools)
   - Session expiry

---

## Database Schema (Future)

When adding database features, consider:

```sql
-- Users table (auto-created by Supabase Auth)
CREATE TABLE auth.users (
  id uuid PRIMARY KEY,
  email text UNIQUE,
  email_confirmed_at timestamp,
  user_metadata jsonb,
  created_at timestamp,
  updated_at timestamp
);

-- Public user profiles
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  full_name text,
  avatar_url text,
  created_at timestamp,
  updated_at timestamp
);

-- Utility payments (example)
CREATE TABLE public.payments (
  id uuid PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id),
  amount integer,
  date timestamp,
  created_at timestamp
);
```

---

## Useful Resources

- [Supabase Docs](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
- [Google OAuth Setup](https://supabase.com/docs/guides/auth/social-login/auth-google)

---

**Last Updated**: March 27, 2026
