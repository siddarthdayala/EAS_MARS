import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import store from './store';
import { Provider } from 'react-redux';

import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import UserListScreen from './screens/admin/UserListScreen';
import UserEditScreen from './screens/admin/UserEditScreen';
import UserFormScreen from './screens/admin/UserFormScreen';
import UserPasswordEditScreen from './screens/admin/UserPasswordEditScreen';
import EmployeeRoute from './components/EmployeeRoute';
import ExpenseForm from './components/ExpenseForm';
import HistoryScreen from './screens/HistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import UserProfileUpdateScreen from './screens/UserProfileUpdateScreen';
import HigherUserRoute from './components/HigherUserRoute';
import ExpenseReportScreen from './screens/ExpenseReportScreen';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />

      {/* Registered users */}
      <Route path="" element={<PrivateRoute />}>
        <Route index={true} path="/" element={<HomeScreen />} />
        <Route path="/user/history" element={<HistoryScreen />} />

        {/* <Route path="/search/:keyword" element={<HomeScreen />} /> */}
        <Route path="page/:pageNumber" element={<HomeScreen />} />
        <Route
          path="user/history/page/:pageNumber"
          element={<HistoryScreen />}
        />
        <Route
          path="/search/:keyword/page/:pageNumber"
          element={<HomeScreen />}
        />
        <Route path="/user/profile" element={<ProfileScreen />} />
        <Route
          path="/userProfile/:id/edit"
          element={<UserProfileUpdateScreen />}
        />

        {/* <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/placeorder" element={<PlaceOrderScreen />} />
        <Route path="/order/:id" element={<OrderScreen />} />
        <Route path="/profile" element={<ProfileScreen />} /> */}
      </Route>
      {/* Employee Routes */}
      <Route path="" element={<EmployeeRoute />}>
        <Route path="/addExpense" element={<ExpenseForm />} />
      </Route>
      {/* Higher User Route */}
      <Route path="" element={<HigherUserRoute />}>
        <Route path="/expense/report" element={<ExpenseReportScreen />} />
      </Route>
      {/* Admin users */}
      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/userlist" element={<UserListScreen />} />
        <Route
          path="admin/userlist/search/:keyword/page/:pageNumber"
          element={<UserListScreen />}
        />
        <Route
          path="admin/userlist/search/:keyword"
          element={<UserListScreen />}
        />
        <Route
          path="/admin/userlist/page/:pageNumber"
          element={<UserListScreen />}
        />
        <Route path="/admin/addUser" element={<UserFormScreen />} />
        <Route
          path="/admin/user/:id/editPassword"
          element={<UserPasswordEditScreen />}
        />
        <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />

        {/* <Route path="/admin/orderlist" element={<OrderListScreen />} />
        <Route path="/admin/productlist" element={<ProductListScreen />} />
        <Route
          path="/admin/productlist/:pageNumber"
          element={<ProductListScreen />}
        /> */}
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <HelmetProvider>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </HelmetProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
