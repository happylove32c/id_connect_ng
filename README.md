# IDConnect - Government Services Portal

A modern, secure web application for accessing government services with authentication powered by Supabase.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Setup](#environment-setup)
- [Available Scripts](#available-scripts)
- [Project Architecture](#project-architecture)
- [Key Components](#key-components)
- [Authentication Flow](#authentication-flow)
- [Contributing](#contributing)

## Overview

IDConnect is a government services portal that provides secure user authentication and access to various government utilities. The application is built with React and styled with Tailwind CSS, using Supabase for backend authentication and database services.

## Features

- **Secure Authentication**: Email/password and Google OAuth login
- **User Registration**: Email-based sign-up with verification
- **Protected Dashboard**: Secured routes that require authentication
- **Utility Services**: Access to government utility bill payments and services
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Real-time Updates**: Session management with Supabase listeners
- **Modern UI**: Clean, professional interface using Lucide React icons

## Tech Stack

- **Frontend Framework**: React 19.2.4
- **Routing**: React Router DOM 7.13.1
- **Backend/Auth**: Supabase 2.100.0
- **Styling**: Tailwind CSS 3.4.19
- **Build Tool**: Vite 8.0.1
- **Icons**: Lucide React 0.577.0
- **Notifications**: React Hot Toast 2.6.0
- **Code Quality**: ESLint 9.39.4

## Project Structure

```
id_connect_ng/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── Utility.jsx       # Utility service card component
│   │   └── WelcomeBar.jsx    # Dashboard welcome header
│   ├── context/              # React Context for state management
│   │   └── AuthContext.jsx   # Authentication context provider
│   ├── modals/               # Modal components
│   │   └── UtilityModal.jsx  # Utility details modal
│   ├── pages/                # Page components (routes)
│   │   ├── AuthPage.jsx      # Login/Sign-up page
│   │   ├── Dashboard.jsx     # Protected dashboard page
│   │   └── Onboard.jsx       # Onboarding page
│   ├── App.jsx               # Main app component with routing
│   ├── main.jsx              # React entry point
│   └── index.css             # Global styles
├── public/                   # Static assets
├── supabaseClient.js         # Supabase client configuration
├── interswitchClient.js      # Interswitch integration
├── package.json              # Project dependencies
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── postcss.config.js         # PostCSS configuration
├── eslint.config.js          # ESLint configuration
└── README.md                 # This file
```

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn package manager
- Supabase account (for authentication)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd id_connect_ng
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

## Environment Setup

### Required Environment Variables

```env
VITE_SUPABASE_URL          # Your Supabase project URL
VITE_SUPABASE_ANON_KEY     # Your Supabase anonymous key
```

These variables are used by the Vite build tool (prefixed with `VITE_`) to make them accessible in the frontend.

### Supabase Configuration

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Enable Google OAuth provider in Authentication settings
3. Configure redirect URLs:
   - Development: `http://localhost:5173/dashboard`
   - Production: `https://yourdomain.com/dashboard`

## Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint to check code quality
npm run lint
```

## Project Architecture

### Authentication Flow

1. **Public Routes**: Users land on `/auth` page
2. **Sign Up/Login**: Users authenticate via email or Google OAuth
3. **Session Management**: Supabase maintains auth state
4. **Protected Routes**: Authenticated users access `/dashboard`
5. **Auto-redirect**: Logged-in users bypass auth page; logged-out users can't access dashboard

### State Management

- **AuthContext**: Global authentication state
  - `user`: Current authenticated user object
  - `loading`: Authentication check in progress
  - `useAuth()`: Hook to access auth context

### Routing

- `/auth` - Authentication page (public)
- `/dashboard` - User dashboard (protected)
- `*` - All other routes redirect to dashboard

## Key Components

### AuthPage (`src/pages/AuthPage.jsx`)

The authentication page handles both login and sign-up functionality.

**Features:**
- Email/password authentication
- Google OAuth integration
- Form validation
- Error handling and success messages
- Mode toggle between login and sign-up

**States:**
- `isLogin`: Toggle between login and sign-up modes
- `loading`: Loading state during API calls
- `formData`: Email and password form inputs
- `error`: Error messages from authentication
- `message`: Success messages (e.g., email confirmation)

**Key Methods:**
- `handleEmailLogin()`: Email/password login via Supabase
- `handleSignup()`: New user registration
- `signInWithGoogle()`: Google OAuth authentication

### Dashboard (`src/pages/Dashboard.jsx`)

The main dashboard after authentication.

**Features:**
- Welcome greeting with user's name
- Service grid layout
- Utility bill management
- Responsive design

**Components Used:**
- `WelcomeBar`: Displays personalized greeting
- `Utility`: Service card component

### AuthContext (`src/context/AuthContext.jsx`)

Manages global authentication state across the application.

**Functionality:**
- Checks initial user session on app load
- Listens for auth state changes
- Provides user and loading states
- Cleanup on component unmount

**Export:**
- `AuthProvider`: Context provider wrapper
- `useAuth()`: Custom hook to access auth context

### WelcomeBar (`src/components/WelcomeBar.jsx`)

Dashboard header component showing personalized greeting.

**Features:**
- Fetches user name from Supabase auth metadata
- Extracts first name from full name
- Fallback to email if name not available
- Responsive header design

### Utility (`src/components/Utility.jsx`)

Service card component for displaying utility bill information.

**Features:**
- Shows last payment amount and date
- Interactive card with hover effects
- Opens modal for detailed information
- Bolt icon for visual identification

**Props:**
- None (currently uses hardcoded data)

### UtilityModal (`src/modals/UtilityModal.jsx`)

Modal dialog for displaying detailed utility information.

**Props:**
- `open`: Boolean to control modal visibility
- `onClose`: Callback function to close modal
- `lastPayment`: Object with payment amount and date

## Authentication Flow

```
┌─────────────┐
│  User Lands │
│   on /auth  │
└──────┬──────┘
       │
       ├─────────────────────┬──────────────────────┐
       │                     │                      │
       ▼                     ▼                      ▼
  ┌─────────┐         ┌─────────────┐      ┌────────────────┐
  │ Sign Up │         │ Email Login │      │ Google OAuth   │
  └────┬────┘         └──────┬──────┘      └────────┬───────┘
       │                     │                      │
       └─────────────────────┴──────────────────────┘
                            │
                    ┌───────▼────────┐
                    │  Supabase Auth │
                    └───────┬────────┘
                            │
              ┌─────────────┴──────────────┐
              │                            │
          ┌───▼────┐              ┌───────▼─────┐
          │ Success│              │   Error     │
          └───┬────┘              └─────────────┘
              │
       ┌──────▼─────────┐
       │ /dashboard     │
       │ (Protected)    │
       └────────────────┘
```

## Security Features

- **Encryption**: 256-bit encryption (Interswitch)
- **Protected Routes**: Route guards prevent unauthorized access
- **Session Persistence**: Auth state maintained across page reloads
- **OAuth**: Secure third-party authentication with Google
- **Environment Variables**: Sensitive data stored securely

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- **Code Splitting**: React Router enables route-based code splitting
- **Lazy Loading**: Components loaded on demand
- **Vite Fast Refresh**: Instant updates during development
- **Tailwind CSS**: Optimized for production builds

## Troubleshooting

### Authentication Issues

**Problem**: "Invalid login credentials"
- Verify Supabase URL and key are correct
- Check user exists in Supabase dashboard
- Confirm email is verified (for sign-up)

**Problem**: Google OAuth redirect fails
- Confirm redirect URL matches Supabase settings
- Check Google OAuth app configuration
- Verify credentials in Supabase auth settings

### Build Errors

**Problem**: Module not found
```bash
npm install
```

**Problem**: Environment variables not recognized
- Restart dev server after adding `.env.local`
- Ensure variables are prefixed with `VITE_`

## Contributing

1. Follow the existing code structure
2. Use components from Lucide React for icons
3. Style with Tailwind CSS utility classes
4. Test authentication flows thoroughly
5. Commit messages should be descriptive

## License

This project is part of the IDConnect government services initiative.

## Support

For issues and support, please contact the development team.

---

**Last Updated**: March 27, 2026
**Version**: 0.0.0
