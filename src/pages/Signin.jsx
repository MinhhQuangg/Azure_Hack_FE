import { GoogleLogin } from "@react-oauth/google";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { chatlas, logo } from "../assets";
import {
  showToastError,
  showToastSuccess,
} from "../components/common/ShowToast";
import axios from "axios";
import { styles } from "../styles";
import visibility from "../assets/eye-solid.svg";
import visibilityOff from "../assets/eye-slash-solid.svg";
import { useAuth } from "../context/authContext";

export const Signin = () => {
  const formContext = useForm();
  const { register, handleSubmit, formState } = formContext;
  const { errors } = formState;
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      console.log(data);
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        data
      );
      if (response.data.status === "success") {
        showToastSuccess("Login successful");
        login(response.data?.token);
        localStorage.setItem('user_id', response.data.user?.id)
        console.log(2222, localStorage.getItem('user_id'))
        navigate("/");
      }
    } catch (err) {
      showToastError(err.response?.data?.message);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleSuccess = async (response) => {
    try {
      setLoading(true);
      const googleData = { token: response.credential };
      const result = await axios.post(
        "http://localhost:3000/auth/google",
        googleData,
        {
          withCredentials: true,
        }
      );
      if (result.data.status === "success") {
        showToastSuccess("Login successful");
        localStorage.setItem('user_id', result.data.user?.id)
        console.log(3333, localStorage.getItem('user_id'))

        login(result.data?.token);
        navigate("/");
      }
    } catch (err) {
      console.error("Error during Google login:", err);
      showToastError("Google login failed.");
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleFailure = (error) => {
    showToastError("Google authentication failed");
    console.error("Google authentication error:", error);
  };

  const inputShadowStyle = {
    boxShadow: "inset 0px 4px 4px rgba(0, 0, 0, 0.25)",
  };

  const inputStyle =
    "w-full rounded-[6px] lg:rounded-[10px] p-[0.5em] font-['Inter'] lg:text-[1.35rem] text-[#757575]";

  const buttonShadow = { boxShadow: "0 4px 4px rgba(0, 0, 0, 0.25)" };

  return (
    <div
      className="flex justify-center items-center h-screen relative w-full"
      style={{
        background:
          "linear-gradient(270deg, #eebf2d 0%, #f1c83d 18%, #f4d14d 36%, #f7da5d 54%, #f9e26d 66%, #fceb7d 81%, #fff48d 94%)",
      }}
    >
      <div className="absolute top-5 left-5 lg:top-10 lg:left-10">
        <div className="flex items-center">
          <img
            src={logo}
            alt="Logo"
            className="cursor-pointer w-[53px] h-[50px]"
            onClick={() => navigate("/")}
          />
          <img
            src={chatlas}
            alt="Logo"
            className="cursor-pointer w-[114px] h-[27px]"
            onClick={() => navigate("/")}
          />
        </div>
      </div>
      <div className="w-[80%] max-w-[500px]">
        <div className={`flex flex-col items-center justify-center mt-2`}>
          <h2 className="font-['Montserrat'] text-[2rem] lg:text-[3rem] font-bold">
            SIGN IN
          </h2>
          <p className={`font-['Inter'] lg:text-[1.35rem]`}>Welcome back!</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col lg:gap-2"
        >
          <div className="flex flex-col lg:gap-2">
            <label
              className={`font-["Montserrat"] font-bold text[1.25rem] lg:text-[1.35rem]`}
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className={`${inputStyle}`}
              style={inputShadowStyle}
              {...register("email", {
                required: { value: true, message: "Email is required" },
              })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email?.message}
              </span>
            )}
          </div>

          <div className="flex flex-col lg:gap-2 mt-2">
            <label
              className={`font-["Montserrat"] font-bold text[1.25rem] lg:text-[1.35rem]`}
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className={`${inputStyle}`}
                style={inputShadowStyle}
                {...register("password", { required: "Password is required" })}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-[50%] right-7"
                style={{ transform: "translate(50%, -50%)" }}
              >
                {showPassword ? (
                  <img
                    src={visibility}
                    alt="invisible"
                    className="w-auto h-6"
                  />
                ) : (
                  <img
                    src={visibilityOff}
                    alt="visible"
                    className="w-auto h-6"
                  />
                )}
              </button>
            </div>
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password?.message}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center align-center gap-2">
              <input
                type="checkbox"
                className="h-[1.35rem] w-[1.35rem]"
                {...register("remember")}
              />
              <span className={`font-["Montserrat"] lg:text-[1.35rem]`}>
                Remember me
              </span>
            </div>
            <button
              onClick={() => navigate("/forgotpassword")}
              className={`font-['Montserrat'] lg:text-[1.35rem] text-center underline`}
            >
              Forgot password?
            </button>
          </div>

          <div className="flex items-center justify-around mt-4 w-full">
            <button
              type="submit"
              className={`w-[33%] font-["Inter"] bg-[#9A3558] hover:bg-[#AF476B] text-white font-bold text-[1.15rem] lg:text-[1.35rem] py-3 rounded-[10px] transition-all duration-100`}
              style={buttonShadow}
            >
              {loading ? "Loading..." : "Sign in"}
            </button>
          </div>
        </form>

        <div className="font-['Montserrat'] pt-5 text-center lg:text-[1.35rem]">
          <p className={`mb-2`}>
            Don't have an account?
            <button
              onClick={() => navigate("/Signup")}
              className="underline ml-2"
            >
              Sign up
            </button>
          </p>
        </div>

        <div className="mt-[20px] mx-auto flex items-center justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
            useOneTap
            size="large"
            theme="outline"
            className="bg-white text-black font-bold py-3 rounded-full text-lg flex items-center justify-center"
          >
            {loading ? (
              "Loading..."
            ) : (
              <>
                <img
                  src="https://img.icons8.com/color/24/000000/google-logo.png"
                  alt="Google Logo"
                  className="mr-2"
                />
                Sign up with Google
              </>
            )}
          </GoogleLogin>
        </div>
      </div>
    </div>
  );
};

export default Signin;
