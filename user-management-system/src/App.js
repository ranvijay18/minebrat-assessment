import Header from "./components/Layout/Navbar";
import Login from "./components/Pages/Login/Login";
import Sign from "./components/Pages/Sign/Sign";
import Search from "./components/Pages/Home/Search";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from "react";

function App() {

  const [isLogin , setIsLogin] = useState(false)

  const handleSign = (data) => {
    setIsLogin(data);
  }

  return (
    <div>
      <Header isLogin={isLogin}/>
      <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Sign onSign={handleSign}/>} />
          <Route path="/home" element={<Search/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
