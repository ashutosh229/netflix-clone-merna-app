import axios from "axios";
import React from "react";
import { IoIosArrowDropdown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { API_END_POINT } from "../utils/constants.js";
import { setUser } from "../redux/userSlice.js";
import { useNavigate } from "react-router-dom";
import { setToggle } from "../redux/movieSlice.js";
import toast from "react-hot-toast";

const Header = () => {
  const user = useSelector((store) => store.app.user);
  const toggle = useSelector((store) => store.movie.toggle);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.get(API_END_POINT.LOGOUT);
      if (res.data.success) {
        toast.success(res.data.message);
      }

      dispatch(setUser(null));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchMovies = async () => {
    dispatch(setToggle());
  };

  return (
    <div className="absolute z-10 flex w-[100vw] items-center justify-between  bg-gradient-to-b from-black">
      <img
        className="w-56"
        src="http://www.freepnglogos.com/uploads/netflix-logo-0.png"
        alt="netflix logo"
      />
      {user && (
        <div className="flex items-center">
          <IoIosArrowDropdown color="white" size="24px" />
          <h1 className="text-lg font-medium text-white">{user.username}</h1>
          <div className="ml-4">
            <button
              onClick={handleLogout}
              className="bg-red-800 text-white px-4 py-2"
            >
              Logout
            </button>
            <button
              onClick={handleSearchMovies}
              className="bg-red-800 text-white px-4 py-2 ml-2"
            >
              {toggle ? "Home" : "Search Movies"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
