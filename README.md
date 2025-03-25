# Legal Dashboard - Practice Management System

A responsive dashboard for a legal practice management system built with Next.js, TypeScript, Redux Toolkit, and Tailwind CSS.

## Project Overview

This application provides a comprehensive dashboard for legal professionals to manage cases, documents, and time tracking. The dashboard includes:

- **Case Summary Widget**: Displays counts of active, pending, and closed cases with trend indicators
- **Recent Documents Widget**: Shows the latest documents with version information
- **Time Tracking Widget**: Visualizes billable hours by attorney
- **Role-based Navigation**: Different menu items and access levels based on user role
- **Authentication**: Secure login with role-based permissions

## Technology Stack

- **Frontend Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Testing**: Jest and React Testing Library

## Setup Instructions

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/legal-dashboard.git
   cd legal-dashboard
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Run the development server:

   ```
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Login Credentials

The application includes two user types with different access levels:

- **Admin User**:

  - Email: admin@legaltech.com
  - Password: admin123
  - Full access to all features, including settings and reports

- **Standard User**:
  - Email: user@legaltech.com
  - Password: user123
  - Limited access (cannot view settings or reports)

## Technical Architecture

### Directory Structure

```
legal-dashboard/
├── app/                  # Next.js App Router pages and layouts
├── components/           # React components
│   ├── auth/             # Authentication components
│   ├── dashboard/        # Dashboard widgets
│   ├── layout/           # Layout components
│   └── ui/               # Reusable UI components
├── redux/                # Redux state management
│   ├── slices/           # Redux Toolkit slices
│   ├── hooks.ts          # Custom Redux hooks
│   └── store.ts          # Redux store configuration
├── services/             # API service modules
├── utils/                # Utility functions and mock data
└── ...                   # Configuration files
```

### Key Design Decisions

1. **App Router Implementation**: Used Next.js 14 App Router for better SEO, improved routing, and server components for better performance.

2. **Role-based Authorization**: Implemented role-based UI elements and protected routes based on user roles.

3. **Mock API Services**: Created simulated API services with random delays and error states to mimic real-world conditions.

4. **UI/UX Approach**: Focused on a clean, responsive design that works well on desktop devices with intuitive data visualization.

5. **Testing Strategy**: Key components tested with Jest and React Testing Library for reliability.

### State Management

The application uses Redux Toolkit for state management with slice-based architecture:

- **authSlice**: Handles authentication state, user data, and login/logout functionality
- **casesSlice**: Manages case summary data
- **documentsSlice**: Handles document listing and operations
- **timeTrackingSlice**: Manages time entry data and calculations

## Assumptions

1. **Authentication**: In a production environment, this would use a secure authentication system with JWT or OAuth. For this demo, we use localStorage for simplicity.

2. **API Integration**: The application uses mock data, but is designed to easily connect to real APIs by updating the service modules.

3. **Error Handling**: Implemented basic error handling for API requests with retry capability.

4. **Responsiveness**: Focused on desktop-only responsive design as specified, but the layout adapts to different desktop screen sizes.

5. **Browser Support**: Optimized for modern browsers (Chrome, Firefox, Safari, Edge).

## Running Tests

```
npm test
```

## Building for Production

```
npm run build
```

## License

[MIT](LICENSE)
