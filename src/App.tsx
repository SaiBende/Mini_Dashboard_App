import './App.css';

// import Home from './component/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, ProtectedRoute } from './context/AuthProvider';
import Dashboard from './pages/Dashboard';
import { ProjectProvider } from './context/ProjectProvider';
import Navbar from './component/Navbar';
import Home from './component/Home';
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<Home />} />

          {/* Protected Route */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                {/* <Home /> */}
                <Navbar/>
                <ProjectProvider><Dashboard /></ProjectProvider>
              </ProtectedRoute>
            }
          />
          

          {/* 404 Not Found Route */}
          <Route path="*" element={<div>404 Not Found</div>} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;