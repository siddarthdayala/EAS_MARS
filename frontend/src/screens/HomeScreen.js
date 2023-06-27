import { Row, Col, Button } from 'react-bootstrap';
import { useGetExpensesQuery } from '../slices/expensesApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import EmployeeExpenseList from '../components/EmployeeExpenseList';
import HRExpenseList from '../components/HRExpenseList';
import DirectorExpenseList from '../components/DirectorExpenseList';
import FinanceDepartmentExpenseList from '../components/FinanceDepartmentExpenseList';
import { Empty, ConfigProvider } from 'antd';

const HomeScreen = () => {
  const { pageNumber } = useParams();
  const { data, refetch, isLoading, error } = useGetExpensesQuery({
    pageNumber,
  });
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
        <div className='add-btn'>
        <h2>Expenses List</h2>
        {userInfo.userType === 'Employee' && (
        <Link to={'/addExpense'}>
          <Button variant="primary">
            Add Expense
          </Button>
        </Link>
      )}
        </div>
          {userInfo.userType === 'Employee' && (
            <EmployeeExpenseList data={data} refetch={refetch} />
          )}
          {userInfo.userType === 'HR' && (
            <HRExpenseList data={data} refetch={refetch} />
          )}
          {userInfo.userType === 'Director' && (
            <DirectorExpenseList data={data} refetch={refetch} />
          )}
          {userInfo.userType === 'FinanceDepartment' && (
            <FinanceDepartmentExpenseList data={data} refetch={refetch} />
          )}
        </>
      )}
    </>
  );
};

export default HomeScreen;
