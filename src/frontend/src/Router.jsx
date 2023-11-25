import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Records from './pages/Dashboard/Records/Records';
import History from './pages/Dashboard/History/History';
import Cameras from './pages/Dashboard/Cameras/Cameras';
import CameraDetails from './pages/Dashboard/Cameras/CameraDetails/CameraDetails';
import Users from './pages/Dashboard/Users/Users';
import UserDetails from './pages/Dashboard/Users/UserDetails/UserDetails';

const Router = () => {
  const token = useSelector(state => state.auth.token);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={token ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/dashboard/*" element={token ? <Dashboard /> : <Navigate to="/login" />}>
          <Route index element={<Navigate to="registros" />} />
          <Route path="registros" element={<Records />} />
          <Route path="historial" element={<History />} />
          <Route path="camaras" element={<Cameras />} />
          <Route path="camaras/:id" element={<CameraDetails />} />
          <Route path="usuarios" element={<Users />} />
          <Route path="usuarios/:id" element={<UserDetails />} />
          <Route path="*" element={<Navigate to="" />} />
        </Route>
        <Route path="*" element={token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
