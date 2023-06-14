import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const EmployeeExpense = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo && userInfo.userType === 'Employee' ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};
export default EmployeeExpense;
