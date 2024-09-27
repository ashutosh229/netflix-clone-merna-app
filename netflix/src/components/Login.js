import React, { useState } from "react";
import Header from "./Header.js";
import axios from "axios";
import { API_END_POINT } from "../utils/constants.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../redux/userSlice.js";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoading = useSelector((store) => store.app.isLoading);

  const handleAuthClick = () => {
    setIsLogin(!isLogin);
  };

  const getInputData = async (event) => {
    event.preventDefault();
    dispatch(setLoading(true));
    if (isLogin) {
      //login
      const user = {
        email: email,
        password: password,
      };
      try {
        const res = await axios.post(API_END_POINT.LOGIN, user, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        if (res.data.success) {
          toast.success(res.data.message);
        }
        dispatch(setUser(res.data.user));
        navigate("/browse");
      } catch (error) {
        toast.error(error.res.data.message);
        console.log(error);
      } finally {
        dispatch(setLoading(false));
      }
    } else {
      //signup or register
      dispatch(setLoading(true));
      const user = {
        username: fullName,
        email: email,
        password: password,
      };
      try {
        const res = await axios.post(`${API_END_POINT}/register`, user, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        if (res.data.success) {
          toast.success(res.data.success);
        }
        setIsLogin(true);
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      } finally {
        dispatch(setLoading(false));
      }
    }

    setFullName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <Header></Header>
      <div className="absolute">
        <img
          className="w-[100vw] h-[100vh] bg-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/dc1cf82d-97c9-409f-b7c8-6ac1718946d6/14a8fe85-b6f4-4c06-8eaf-eccf3276d557/IN-en-20230911-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt="background-img"
        />
      </div>
      <form
        onSubmit={getInputData}
        className=" flex flex-col w-3/12 p-12 my-36 left-0 right-0 mx-auto items-center justify-center absolute rounded-md bg-black opacity-90"
      >
        <h1 className="text-3xl text-white mb-5 font-bold">
          {isLogin ? "Login" : "Sign Up"}
        </h1>
        <div className="flex flex-col">
          {!isLogin && (
            <input
              value={fullName}
              onChange={(event) => {
                setFullName(event.target.value);
              }}
              type="text"
              placeholder="Username"
              className="outline-none p-3 my-2 rounded-sm bg-gray-800 text-white"
            />
          )}

          <input
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            value={email}
            type="email"
            placeholder="Email"
            className="outline-none p-3 my-2 rounded-sm bg-gray-800 text-white"
          />

          <input
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            value={password}
            type="password"
            placeholder="Password"
            className="outline-none p-3 my-2 rounded-sm bg-gray-800 text-white"
          />
          <button
            type="submit"
            className="bg-red-600 mt-6 p-3 text-white rounded-sm font-medium"
          >
            {`
              ${isLoading ? "Loading.." : isLogin ? "Login" : "Sign Up"}
              `}
          </button>
          <p className="text-white mt-2">
            {isLogin ? "New to Netflix?" : "Already have an account?"}
            <span
              onClick={handleAuthClick}
              className="ml-1 text-blue-900 font-medium cursor-pointer"
            >
              {isLogin ? "Sign Up" : "Login"}
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
