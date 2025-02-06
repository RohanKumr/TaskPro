import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/Signup';
import Dashboard from './pages/dashboard/index';
import { AuthProvider, useAuth } from './context/AuthContext.js';


function App() {

  const Auth = ({ children }) => {
    const { user } = useAuth();
    console.log(user)
    return user ? children : <Navigate to="/login" />
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          <Route path="/"
            element={
              <Auth>
                <Dashboard />
              </Auth>
            } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/signup" element={ <SignUp /> } />
          <Route path="*" element={ <Navigate to="/" /> } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>


  );
}

export default App;
