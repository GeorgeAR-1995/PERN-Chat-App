import { Toaster } from "react-hot-toast";
import Home from "./ui_design/pages/home/Home";
import Login from "./ui_design/pages/login/Login";
import SignUp from "./ui_design/pages/signup/SignUp";
import { Route, Routes } from "react-router-dom";

function App() {

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      {/* <SignUp /> */}
      {/* <Home /> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
