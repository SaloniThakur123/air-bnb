import axios from "axios";
import Header from "./components/Header";
import Login from "./components/Login";
import Signin from "./components/Signin";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import { Route, Routes } from "react-router-dom";
import AccountPage from "./Pages/AccountPage";

function App() {
  axios.defaults.baseURL = "http://localhost:4000";
  axios.defaults.withCredentials=true;
  const {user}=useContext(UserContext);

  console.log("jymy",user);
  return (
    <>
      <Header/>
      <Routes>
        <Route path='/account' element={<AccountPage/>}/>
        <Route path='/account/:subpage' element={<AccountPage/>}/>
        <Route path='/account/:subpage/:action' element={<AccountPage/>}/>
      </Routes>
    </>
  );
}

export default App;
