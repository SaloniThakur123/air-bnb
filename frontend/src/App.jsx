import axios from "axios";
import Header from "./components/Header";
import Login from "./components/Login";
import Signin from "./components/Signin";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import { Route, Routes } from "react-router-dom";
import AccountPage from "./Pages/AccountPage";
import IndexPage from "./Pages/IndexPage";
import PlacePage from "./Pages/PlacePage";

function App() {
  axios.defaults.baseURL = import.meta.env.VITE_BACKEND;
  axios.defaults.withCredentials=true;
  const {user}=useContext(UserContext);

  console.log("jymy",user);
  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<IndexPage/>}/>
        <Route path='/account' element={<AccountPage/>}/>
        <Route path='/account/:subpage' element={<AccountPage/>}/>
        <Route path='/account/:subpage/:action' element={<AccountPage/>}/>
        <Route path='/places/:placeId' element={<PlacePage/>}></Route>
      </Routes>
    </>
  );
}

export default App;
