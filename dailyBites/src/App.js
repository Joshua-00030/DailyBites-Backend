import './App.css';
import { Routes, Route} from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Log from './components/Log/Log';
import Account from './components/Account/Account';
import { useState } from 'react';
import LoginForm from './components/LoginForm/LoginForm';
import PageNotFound from './components/PageNotFound/PageNotFound';

function App() {

  const [user, setUser] = useState({name: "" , email: ""})

  function login(details) {
    console.log(details)
    setUser({...user, name: details.username});
  }

  function logout() {
    setUser({...user, name: ""});
  }

  if (user.name === "") {
    return <LoginForm Login={login}/>
  }

  return (
  <>
    <Navbar logout={logout}/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/log" element={<Log />} />
      <Route path="/account" element={<Account />} />
    </Routes>
  </>
  )
}

export default App;
