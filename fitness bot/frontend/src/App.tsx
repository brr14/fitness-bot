import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Home from "./pages/home";
import Chatbot from "./pages/chatbot";
import Aboutus from "./pages/aboutus";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import MealPlan from "./pages/mealplan";
import Progress from "./pages/progress";
import LandingPage from "./pages/landing";
import { GraphProvider } from "./context/context";
import { ReactNode, useEffect } from "react";

function App() {

  function PrivateRoute({ children }: { children: ReactNode }) {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/signin" />;
  }

  return (
    <GraphProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DefaultDirect />} />
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/chatbot" element={<PrivateRoute><Chatbot /></PrivateRoute>} />
          <Route path="/aboutus" element={<PrivateRoute><Aboutus /></PrivateRoute>} />
          <Route path="/mealplan" element={<PrivateRoute><MealPlan /></PrivateRoute>} />
          <Route path="/progress" element={<PrivateRoute><Progress /></PrivateRoute>} />
          <Route path="/visualizationdashboard" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </GraphProvider>
  );
}

function DefaultDirect() {
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
