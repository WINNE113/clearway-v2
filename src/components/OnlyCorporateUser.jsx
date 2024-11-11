import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export default function OnlyCorporateUserPrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser && (currentUser.role == 2) ? (
    <Outlet />
  ) : (
    <Navigate to='/sign-in' />
  );
}