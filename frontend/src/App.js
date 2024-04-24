// import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
// import Hello from './components/Hello';
// import AppRouter from './Router';
import { Provider } from 'react-redux';
// import store from './store/store';
import Login from './views/Login';
import LeaderBoard from './views/LeaderBoard';
import Home from './views/Home';
import store from './store/store';
function App() {
  return (
    <>
      {/* <Provider store={store}> */}
        <Router>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/leaderboard" element={<LeaderBoard/>} />
            {/* <Route path="/about" component={About} /> */}
          </Routes>
        </Router>
      {/* </Provider> */}
      {/* <Hello/> */}
    </>
  );
}

export default App;
