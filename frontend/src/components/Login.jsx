import { UserContext } from "@/context/UserContext";
import axios from "axios";
import { useContext, useState } from "react";

const Login = ({ setLogin ,setSignin}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {setUser}=useContext(UserContext);

  async function submitHandler(e){
    e.preventDefault();
    console.log(email,password);
    const res=await axios.post('/login', { email: email, password: password});
    console.log(res);
    const data=res.data.user;
    setUser(data);
    localStorage.setItem('user',JSON.stringify(data));
    setEmail('');
    setPassword('');
    setLogin(false);
  }
  return (
    <div className="flex flex-col border w-1/3 gap-2 absolute left-1/3 top-20 shadow-md rounded-lg z-20 bg-white">
      <div className="flex border-b p-3">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
            onClick={() => setLogin(false)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>
        <div className="m-auto text-xl font-bold">Login</div>
      </div>

      <form className="flex flex-col gap-3 p-4" onSubmit={submitHandler}>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border border-black  rounded-md h-10 px-2 text-lg"
        ></input>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-black rounded-md h-10 px-2 text-lg "
        ></input>
        <button type="submit"  className="bg-primary rounded-md h-10 w-1/2 text-white font-bold text-lg ">
          Login
        </button>
        <div className="hover:text-blue-800 cursor-pointer" onClick={()=>setSignin(true)}>
          Dont have account?

        </div>
      </form>
    </div>
  );
};

export default Login;
