# Mini SaaS Dashboard

This project is a Mini SaaS Dashboard built with React, TypeScript, Firebase, and TailwindCSS. It provides user authentication, project management, and a responsive UI.

## Features

- User authentication with Google Sign-In
- Project management (CRUD operations)
- Firebase Firestore integration
- Protected routes
- Responsive design with TailwindCSS
- Toast notifications for user feedback

---

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- Firebase project set up with Firestore and Authentication enabled

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/Mini_SaaS_Dashboard.git
   cd Mini_SaaS_Dashboard

2. Install dependencies:

   ```bash
   npm install
   ```

   or if you use yarn:

   ```bash
   yarn install
   ```

3. Configure Firebase:

   - Replace the Firebase configuration in `src/firebase/firebase.tsx` with your Firebase project's credentials.

---

## Running the Project

### Development Server

To start the development server, run:

```bash
npm run dev
```

or with yarn:

```bash
yarn dev
```

This will start the Vite development server. Open your browser and navigate to `http://localhost:5173`.

### Build for Production

To build the project for production, run:

```bash
npm run build
```

or with yarn:

```bash
yarn build
```

The production-ready files will be in the `dist` directory.

### Preview Production Build

To preview the production build, run:

```bash
npm run preview
```

or with yarn:

```bash
yarn preview
```

