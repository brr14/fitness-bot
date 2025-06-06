import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Home from "./pages/home";
import Aboutus from "./pages/aboutus";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import MealPlan from "./pages/mealplan";
import Progress from "./pages/progress";
import LandingPage from "./pages/landing";
import { GraphProvider } from "./context/context";
import { useEffect } from "react";
import ChatBot from "./pages/chaatbot";

const BYPASS_AUTH = true; // 🔥 set to TRUE to bypass auth for testing

function App() {
  return (
    <GraphProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DefaultRedirect />} />
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/aboutus" element={<PrivateRoute><Aboutus /></PrivateRoute>} />
          <Route path="/mealplan" element={<PrivateRoute><MealPlan /></PrivateRoute>} />
          <Route path="/progress" element={<PrivateRoute><Progress /></PrivateRoute>} />
          <Route path="/visualizationdashboard" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </GraphProvider>
  );
}

// ⬇️ Fixed PrivateRoute component
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  if (BYPASS_AUTH) {
    return <>{children}</>; // 🔥 bypass auth if testing
  }

  return token ? <>{children}</> : <Navigate to="/signin" replace />;
}

// ⬇️ Fixed DefaultRedirect component
function DefaultRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate('/home');
    } else {
      navigate('/signin');
    }
  }, [navigate]);

  return null;
}

export default App;
