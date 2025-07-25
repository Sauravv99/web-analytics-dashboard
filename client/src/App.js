import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './redux/slices/authSlice';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Redux Auth Demo</h1>
      {isAuthenticated ? (
        <>
          <p>Welcome, {user.email}</p>
          <button onClick={() => dispatch(logout())}>Logout</button>
        </>
      ) : (
        <>
          <RegisterForm />
          <LoginForm />
        </>
      )}
    </div>
  );
}

export default App;
