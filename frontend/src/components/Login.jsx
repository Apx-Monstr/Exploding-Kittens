import React, { useState } from "react";
import axios from "axios"; // Import Axios
import { useDispatch } from "react-redux";
import { setUsername } from "../store/store";
import { useNavigate, useRoutes } from "react-router-dom";
const Login = () => {
  const dispatch = useDispatch();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      axios.post('http://localhost:8975/login', { username, password })
      .then(response =>{
        console.log(response.data)
        // dispatch(setUsername(response.data.username));
        dispatch(setUsername(username));
        sessionStorage.setItem("username", username);
        setUserName('');
        setPassword('');
        setError('');
        navigate("/")
      })
      
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  return (
      <div className="bg-green-400 h-screen w-screen flex items-center justify-center">
        <div className="max-w-fit w-full">
          <div className="p-16 rounded bg-white flex flex-col gap-8">
            <div className="text-4xl font-bold">😸Login</div>
            <form className="flex flex-col gap-8" onSubmit={handleLogin}>
              <input
                className="outline-none p-3 rounded w-96 border-2 border-blue-300 focus:border-blue-500"
                placeholder="Username"
                type="text"
                value={username} 
                onChange={(e) => setUserName(e.target.value)}
              />
              <input
                className="outline-none p-3 rounded w-96 border-2 border-blue-300 focus:border-blue-500"
                placeholder="Password"
                type="password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="bg-blue-500 rounded p-4" type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
  );
};

export default Login;
