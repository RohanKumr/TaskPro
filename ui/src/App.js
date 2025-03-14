import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/Signup';
import Dashboard from './pages/dashboard/index';
import { AuthProvider, useAuth } from './context/AuthContext.js';
import ViewUsers from './pages/dashboard/view-users/index.js';
import AddUsers from './pages/dashboard/add-users/index.js';
import AssignTasks from './pages/dashboard/assign-tasks/index.js';
import AddTasks from './pages/dashboard/add-tasks/index.js';
import Tasks from './pages/dashboard/tasks/index.js';

function Auth({ children }) {
  const { user, loading } = useAuth();
  console.log('Routes', user);
  console.log("Routes", user ? user : "go to login");
  if(loading) return <h1>Loading...</h1>
  return user ? children : <Navigate to="/login" replace />
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Auth><Dashboard /></Auth> } >
            <Route path="admin/view-users" element={ <ViewUsers /> } />
            <Route path="admin/add-users" element={ <AddUsers /> } />
            <Route path="admin/assign-tasks" element={ <AssignTasks /> } />
            <Route path="admin/add-tasks" element={ <AddTasks /> } />

            <Route path="admin/tasks" element={ <Tasks /> } />
            <Route path="tasks" element={ <Tasks /> } />
          </Route>
          <Route path="/login" element={ <Login /> } />
          {/* <Route path="/signup" element={ <SignUp /> } /> */ }
          <Route path="*" element={ <Navigate to="/login" replace /> } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
