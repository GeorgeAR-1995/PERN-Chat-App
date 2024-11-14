import { Toaster } from "react-hot-toast";
import Home from "./ui_design/pages/home/Home";
import Login from "./ui_design/pages/login/Login";
import SignUp from "./ui_design/pages/signup/SignUp";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";

function App() {
  const { authUser, isLoading } = useAuthContext();

  if(isLoading) return null;

  console.log("auth user:", authUser);
  
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route path='/' element={ authUser ? <Home /> : <Navigate to={"/login"} />} />
        <Route path='/login' element={!authUser ? <Login /> : <Navigate to={"/"} />} />
        <Route path='/signup' element={!authUser ? <SignUp /> : <Navigate to={"/"} />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
