# SERB Test Next App

An employee management system built with Next.js 15, featuring secure authentication, employee CRUD operations, and user profile management.

## 🚀 Features

### Authentication System

- **Secure Login/Logout** with JWT token management

### Employee Management

- **Add New Employees** with form validation
- **Edit Employee Details** with pre-populated forms
- **Delete Employees** with confirmation modals
- **Profile Picture Support** with image upload functionality
- **Redux State Management** for efficient data handling

### User Interface

- **Modern Design** with Tailwind CSS
- **Reusable Components** (Button, Card, Input, Table, Modal)
- **Lucide React Icons** for centralized icons support

## 🛠️ Tech Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind
- **State Management:** Redux Toolkit with Redux Persist
- **HTTP Client:** Axios with interceptors
- **Icons:** Lucide React

### Token Management

- **JWT Access Tokens** stored securely in localStorage
- **Token Validation** with expiration checking
- **Automatic Logout** on token expiration

## 📝 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality

### Environment Variables

- `NEXT_PUBLIC_API_BASE_URL` - Backend API base URL
