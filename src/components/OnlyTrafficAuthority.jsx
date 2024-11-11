import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export default function OnlyTrafficAuthorityPrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser && (currentUser.role == 3) ? (
    <Outlet />
  ) : (
    <Navigate to='/sign-in' />
  );
}