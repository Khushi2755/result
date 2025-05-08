# Project Title

This project is a full-stack web application consisting of a React-based frontend and a Node.js/Express backend with MongoDB. It provides user authentication, role-based dashboards for students and teachers, and various features related to academic management.

---

## Frontend

### Overview

The frontend is built with React and TypeScript, using Vite as the build tool. It leverages Tailwind CSS for styling and Radix UI components for accessible UI elements. React Router is used for client-side routing, and React Query manages server state and data fetching.

### Installation

Navigate to the `frontend` directory and install dependencies:

```bash
cd frontend
npm install
```

### Running the Development Server

Start the development server with:

```bash
npm run dev
```

This will launch the app at `http://localhost:5173` (default Vite port).

### Building for Production

To build the production-ready files, run:

```bash
npm run build
```

### Previewing the Production Build

To preview the production build locally:

```bash
npm run preview
```

### Project Structure

- `src/components/` - Reusable UI components
- `src/pages/` - Page components mapped to routes
- `src/hooks/` - Custom React hooks
- `src/utils/` - Utility functions
- `public/` - Static assets like images and favicon
- `vite.config.ts` - Vite configuration
- `tailwind.config.ts` - Tailwind CSS configuration

---

## Backend

### Overview

The backend is a RESTful API built with Node.js and Express. It uses MongoDB for data storage via Mongoose ODM. Authentication is handled with JWT tokens. The backend exposes routes for authentication, teacher, and student functionalities.

### Installation

Navigate to the `backend` directory and install dependencies:

```bash
cd backend
npm install
```

### Environment Variables

Create a `.env` file in the `backend` directory to configure environment variables such as:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Running the Server

Start the backend server with:

```bash
node server.js
```

The server will run on the port specified in `.env` or default to `5000`.

### Project Structure

- `config/` - Database connection and configuration
- `controllers/` - Route handler logic
- `middleware/` - Express middleware (e.g., authentication)
- `models/` - Mongoose models
- `routes/` - Express route definitions
- `server.js` - Entry point of the backend server

---

## Running Frontend and Backend Together

1. Start the backend server first:

```bash
cd backend
node server.js
```

2. In a separate terminal, start the frontend development server:

```bash
cd frontend
npm run dev
```

The frontend will communicate with the backend API at `http://localhost:5000/api`.

---

## Technologies Used

- Frontend:
  - React 18
  - TypeScript
  - Vite
  - Tailwind CSS
  - Radix UI
  - React Router
  - React Query
  - Axios

- Backend:
  - Node.js
  - Express
  - MongoDB with Mongoose
  - JWT Authentication
  - dotenv
  - CORS

---

## License

This project is licensed under the MIT License.
