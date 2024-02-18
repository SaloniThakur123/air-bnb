import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useContext, useState } from "react";
import Login from "./Login";
import Signin from "./Signin";
import Backdrop from "./Backdrop";
import { createPortal } from "react-dom";
import { UserContext } from "@/context/UserContext";
import axios from "axios";

const Header = () => {
  const [login, setLogin] = useState(false);
  const [signin, setSignin] = useState(false);
  const { user,setUser} = useContext(UserContext);

  async function logoutHandler(){
    const res=await axios.post('/logout');
    localStorage.removeItem('user');
    setUser(null);
  }

  return (
    <div className="flex justify-between p-4 items-center">
      <div className="flex gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 -rotate-90"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
          />
        </svg>

        <div className="text-xl font-bold">airSnS</div>
      </div>

      <div className="flex gap-3 items-center border border-gray-400 px-4 py-2 rounded-full shadow-md shadow-gray-300">
        <div>Anywhere</div>
        <div className="border-r border-gray-400 h-7"></div>
        <div>Any week</div>
        <div className="border-r border-gray-400 h-7"></div>
        <div>Add guests</div>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex gap-2 border border-gray-400 rounded-full px-4 py-2 shadow-md shadow-gray-300">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 border rounded-full border-grey-500 text-white bg-gray-500"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {user && (
            <>
              <DropdownMenuLabel>{user.fullName}</DropdownMenuLabel>
              <DropdownMenuItem> <div onClick={logoutHandler}>Logout</div></DropdownMenuItem>
              <DropdownMenuItem>Account</DropdownMenuItem>

            </>
          )}
          {!user && (
            <>
              <DropdownMenuItem>
                {" "}
                <div onClick={() => setLogin(true)}>Login</div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div onClick={() => setSignin(true)}>Sign in</div>
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem>AirBnB your home</DropdownMenuItem>
          <DropdownMenuItem>Help</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {(login || signin) && createPortal(<Backdrop />, document.body)}
      {signin && createPortal(<Signin setSignin={setSignin} setLogin={setLogin}/>, document.body)}
      {login && createPortal(<Login setLogin={setLogin} setSignin={setSignin}/>, document.body)}
    </div>
  );
};

export default Header;
