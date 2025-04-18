import './App.css';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Dashboard from './pages/dashboard/index';
import { AuthProvider, useAuth } from './context/AuthContext.js';
import ViewUsers from './pages/dashboard/view-users/index.js';
import AddUsers from './pages/dashboard/add-users/index.js';
import AssignTasks from './pages/dashboard/assign-tasks/index.js';
import AddTasks from './pages/dashboard/add-tasks/index.js';
import Tasks from './pages/dashboard/tasks/index.js';
import Restricted from './pages/dashboard/restricted/index.js';
import { ToastContainer } from 'react-toastify';
import Profile from './pages/dashboard/profile/index.js';
import TaskDetails from './pages/dashboard/task-details/index.js';
import CheckoutForm from './pages/dashboard/payment/index.js';
import SuccessPage from './pages/dashboard/payment/success';
import ErrorPage from './pages/dashboard/payment/cancel.js';
import { ROLES } from './utils/enums.js';
import { HelmetProvider } from 'react-helmet-async';


function Auth({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  if(loading) return <h1>Loading...</h1>
  if(!user) return <Navigate to="/login" replace />;

  const role = user.role;
  const path = location.pathname;

  // const isAdminPath = path.startsWith('/admin');
  const isEmployeePath = path.startsWith('/employee');

  if(role === ROLES.ADMIN) {
    if(path === "/") return <Navigate to="admin/tasks" />
    return children;
  }

  if(role === ROLES.USER && isEmployeePath) {
    return children;
  } else if(path === '/') {
    return <Navigate to="/employee/tasks" replace />
  }

  return <Navigate to="/restricted" replace />;
};

function App() {
  return (<>
    <ToastContainer />

    <HelmetProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={ <Auth><Dashboard /></Auth> } >
              {/* ADMIN Routes */ }
              <Route path="admin/view-users" element={ <ViewUsers /> } />
              <Route path="admin/add-users" element={ <AddUsers /> } />
              <Route path="admin/assign-tasks" element={ <AssignTasks /> } />
              <Route path="admin/add-tasks" element={ <AddTasks /> } />
              <Route path="admin/tasks" element={ <Tasks /> } />
              <Route path="admin/profile" element={ <Profile /> } />
              <Route path="admin/task/:id" element={ <TaskDetails /> } />
              <Route path="admin/checkout" element={ <CheckoutForm /> } />
              <Route path="admin/success" element={ <SuccessPage /> } />
              <Route path="admin/cancel" element={ <ErrorPage /> } />


              {/* EMPLOYEE Routes */ }
              <Route path="employee/profile" element={ <Profile /> } />
              <Route path="employee/" element={ <Profile /> } />
              <Route path="employee/tasks" element={ <Tasks /> } />
              <Route path="employee/task/:id" element={ <TaskDetails /> } />
              <Route path="employee/add-task" element={ <AddTasks /> } />
              <Route path="/employee/checkout" element={ <CheckoutForm /> } />
              <Route path="/employee/success" element={ <SuccessPage /> } />
              <Route path="/employee/cancel" element={ <ErrorPage /> } />
            </Route>
            <Route path="/login" element={ <Login /> } />
            <Route path="/restricted" element={ <Restricted /> } />
            {/* <Route path="/signup" element={ <SignUp /> } /> */ }
            <Route path="*" element={ <Navigate to="/login" replace /> } />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  </>
  );
}

export default App;
