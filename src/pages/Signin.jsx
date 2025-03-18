import { GoogleLogin } from "@react-oauth/google";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { chatlas, logo, visibility, visibilityOff } from "../assets";
import {
  showToastError,
  showToastSuccess,
} from "../components/common/ShowToast";
import axios from "axios";
import { styles } from "../styles";
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
  return (
    <div
      className="flex justify-center items-center h-screen relative"
      style={{
        background:
          "linear-gradient(270deg, #eebf2d 0%, #f1c83d 18%, #f4d14d 36%, #f7da5d 54%, #f9e26d 66%, #fceb7d 81%, #fff48d 94%)",
      }}
    >
      <div className="absolute top-10 left-10">
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
      <div className="xl:w-1/5 ">
        <div
          className={`${styles.headerSignInText} mb-8 flex flex-col items-center justify-center`}
        >
          <h2 className="font-bold mb-3">SIGN IN</h2>
          <p className={`${styles.headerSignInSubText} mb-2`}>Welcome back!</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className={`${styles.headerSignInSubText} mb-3 block text-[20px] font-bold`}
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className={`w-full border-b-2 ${
                errors.email ? "border-red-500" : "border-gray-300"
              } text-base p-2 mb-2 rounded focus:outline-none shadow-md focus:shadow-lg`}
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

          <div className="mb-4">
            <label
              className={`${styles.headerSignInSubText} mb-3 block text-[20px] font-bold`}
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className={`w-full border-b-2 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } text-base p-2 mb-2 rounded focus:outline-none shadow-md focus:shadow-lg`}
                {...register("password", { required: "Password is required" })}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-3 right-2"
              >
                {showPassword ? (
                  <img src={visibility} alt="invisible" className="w-5 h-5" />
                ) : (
                  <img src={visibilityOff} alt="visible" className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password?.message}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 mr-2"
                {...register("remember")}
              />
              <span className={`${styles.signInSubText}`}>Remember me</span>
            </div>
            <button
              onClick={() => navigate("/forgotpassword")}
              className={`${styles.signInSubText} block text-center underline`}
            >
              Forgot password?
            </button>
          </div>

          <div className="flex items-center justify-around mt-4">
            <button
              type="submit"
              className={`bg-[#9A3558] w-full text-white font-bold py-2 rounded-full text-lg`}
            >
              {loading ? "Loading..." : "Sign in "}
            </button>
          </div>
        </form>

        <div className="pt-5 text-center">
          <p className={`mb-2`}>
            Don't have an account? &nbsp;
            <button onClick={() => navigate("/Signup")} className="underline">
              Sign up!
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
