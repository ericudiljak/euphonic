import React, { useContext } from "react";
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./context/authContext";
import Navbar from "./components/navbar/Navbar";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Streaming from "./pages/streaming/Streaming";
import Layout1 from "./components/Layout1/Layout1";
import Intro from "./pages/intro/Intro";
import "./style.scss";
import { DarkModeContext } from "./context/darkModeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Guest from "./pages/guestPage/Guest";
import Layout2 from "./components/Layout2/Layout2";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import HomeR from "./pages/home/HomeR";
import Admin from "./pages/admin/Admin";

function App() {
  const { currentUser } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);
  const queryClient = new QueryClient();

  const LayoutHome = ({ children }) => (
    <QueryClientProvider client={queryClient}>
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <Navbar />
        <div style={{ display: "flex" }}>
          <LeftBar />
          <div style={{ flex: 6 }}>
            {children}
          </div>
          <RightBar />
        </div>
      </div>
    </QueryClientProvider>
  );

  const ProtectedRoute = ({ children, isGuestRoute = false }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    if (currentUser.role === "guest" && !isGuestRoute) {
      return <Navigate to="/register" />;
    }

    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Intro />, // Intro page for entering as guest
    },
    {
      path: "/guest",
      element: (
        <ProtectedRoute isGuestRoute={true}>
          <Layout2>
            <Guest />
          </Layout2>
        </ProtectedRoute>
      ),
    },
    {
      path: "/streaming",
      element: (
        <ProtectedRoute isGuestRoute={true}>
          <Layout1>
            <Streaming />
          </Layout1>
        </ProtectedRoute>
      ),
    },
    {
      path: "/home",
      element: (
        <ProtectedRoute>
          <LayoutHome>
            <Home />
          </LayoutHome>
        </ProtectedRoute>
      ),
    },
    {
      path: "/homeRegistered",
      element: (
        <ProtectedRoute>
          <LayoutHome>
            <HomeR />
          </LayoutHome>
        </ProtectedRoute>
      ),
    },
    {
      path: "/profile/:id",
      element: (
        <ProtectedRoute>
          <LayoutHome>
            <Profile />
          </LayoutHome>
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin",
      element: (
        <ProtectedRoute>
            <Admin />
        </ProtectedRoute>
      ),
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
