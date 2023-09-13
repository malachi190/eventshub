import { useState } from "react";
import "./App.css";
import Login from "./components/auth/login/Login";
import Register from "./components/auth/register/Register";
import Events from "./components/pages/AllEvents/Events";
import CreateEvent from "./components/pages/createEvent/CreateEvent";
import { AuthProvider } from "./context/AuthContext";
import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Link,
} from "react-router-dom";
import PrivateRoute from "./components/auth/private/PrivateRoute";


const router = createBrowserRouter([
  {
    path: "/events",
    element: (
      <PrivateRoute>
        <Events/>
      </PrivateRoute>
    ),
  },
  {
    path: "/create-event",
    element: (
      <PrivateRoute>
        <CreateEvent />
      </PrivateRoute>
    ),
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

function App() {
  return (
    <AuthProvider>
      <div className="main">
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  );
}

export default App;
