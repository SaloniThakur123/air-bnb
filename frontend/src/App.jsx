import axios from "axios";
import Header from "./components/Header";
import Login from "./components/Login";
import Signin from "./components/Signin";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";

function App() {
  axios.defaults.baseURL = "http://localhost:4000";
  axios.defaults.withCredentials=true;
  const {user}=useContext(UserContext);

  console.log("jymy",user);
  return (
    <>
      <Header/>
      {/* <Login/>
      <Signin/> */}
    </>
  );
}

export default App;
