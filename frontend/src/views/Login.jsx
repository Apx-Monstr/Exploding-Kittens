import React from 'react'
import Login from '../components/Login';
import { Provider } from 'react-redux';
import store from '../store/store';
const LoginView = () => {
  return (
    // <Provider store={store}>
      <Login/>
    // {/* </Provider> */}
  )
}

export default LoginView;