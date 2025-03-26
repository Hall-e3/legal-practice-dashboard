# Legal Dashboard - Practice Management System

A responsive dashboard for a legal practice management system built with Next.js, TypeScript, Redux Toolkit, and Tailwind CSS.

## Project Overview

This application provides a comprehensive dashboard for legal professionals to manage their cases, track time, and access documents. The dashboard includes role-based access control, with different features available to admin and standard users.

### Key Features

- **Case Summary Widget**: Displays counts of active, pending, and closed cases with trend indicators
- **Recent Documents Widget**: Shows latest documents with version tracking
- **Time Tracking Widget**: Displays billable hours by attorney with filtering capabilities
- **Role-based Navigation**: Different menu items based on user role
- **Authentication System**: Login with role-based access control

## Technology Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, React
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Authentication**: Custom auth with Redux (simulated)
- **Testing**: Jest, React Testing Library

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd legal-dashboard

# Install dependencies
npm install
# or
yarn install
```

### Running the Application

```bash
# Start the development server
npm run dev
# or
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Login Credentials

The application comes with two predefined user accounts:

### Admin User

- **Email**: admin@legaltech.com
- **Password**: admin123
- **Access**: All features including settings and reports

### Standard User

- **Email**: user@legaltech.com
- **Password**: user123
- **Access**: Limited to basic dashboard features

## Architecture and Technical Decisions

### State Management

The application uses Redux Toolkit for state management, with separate slices for:

- Authentication
- Cases
- Documents
- Time Tracking
- Notifications

### API Simulation

The application simulates API interactions with mock data services, demonstrating:

- Loading states
- Error handling
- CRUD operations

### Component Structure

- **Layout Components**: Sidebar, Header, Dashboard Layout
- **Widget Components**: Case Summary, Time Tracking, Recent Documents
- **UI Components**: Cards, Buttons, Inputs, Loading States
- **Page Components**: Dashboard, Login, Settings

### Authentication Flow

1. User enters credentials on login page
2. Credentials are validated against mock user database
3. On successful authentication, user info is stored in Redux and localStorage
4. Protected routes check authentication state before rendering
5. Role-based UI elements are conditionally rendered based on user role

## Testing

To run the test suite:

```bash
npm test
# or
yarn test
```

The test suite includes:

- Component tests for UI elements
- Integration tests for authentication flow
- Unit tests for Redux actions and reducers

## Assumptions Made

- I assumed to use the lefthook dev package to help me with preventing commiting error code
- I assumed the usage of lodash just to capitialize the first letter of the name of the user displayed.
- I also assumed to use redux persist to persist the logged in user

## Future Enhancements

- Real API integration
- Persistent data storage
- Advanced filtering and reporting
- Calendar integration
- Document editing capabilities

