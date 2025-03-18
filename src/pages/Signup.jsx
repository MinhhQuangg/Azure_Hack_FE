import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { chatlas, logo, visibility, visibilityOff } from "../assets";
import {
  showToastError,
  showToastSuccess,
} from "../components/common/ShowToast";
import { styles } from "../styles";
import axios from "axios";
import { useAuth } from "../context/authContext";

const Signup = () => {
  const formContext = useForm();
  const { register, handleSubmit, formState, getValues } = formContext;
  const { errors } = formState;
  const { login } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/signup",
        data
      );
      console.log(response);
      if (response.data?.status === "success") {
        showToastSuccess(response.data?.message);
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
          <h2 className="text-[50px] font-bold mb-3">SIGN UP</h2>
          <p className={`${styles.headerSignInSubText}`}>Glad to have you!</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2">
            <label
              className={`${styles.headerSignInSubText} mb-3 block text-[20px] font-bold`}
            >
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className={`w-full border-b-2 ${
                errors.email ? "border-red-500" : "border-gray-300"
              } text-base p-2 mb-2 rounded focus:outline-none shadow-md focus:shadow-lg`}
              {...register("username", {
                required: { value: true, message: "Username is required" },
              })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email?.message}
              </span>
            )}
          </div>
          <div className="mb-2">
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

          <div className="mb-2">
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

          <div className="mb-2">
            <label
              className={`${styles.headerSignInSubText} mb-3 block text-[20px] font-bold`}
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="Confirm your password"
                className={`w-full border-b-2 ${
                  errors.passwordConfirm ? "border-red-500" : "border-gray-300"
                } text-base p-2 mb-2 rounded focus:outline-none shadow-md focus:shadow-lg`}
                {...register("passwordConfirm", {
                  required: "Please confirm your password",
                  validate: (value) => {
                    const { password } = getValues();
                    return value === password || "Passwords do not match"; // Compare with password
                  },
                })}
              />
            </div>
            {errors.passwordConfirm && (
              <span className="text-red-500 text-sm">
                {errors.passwordConfirm?.message}
              </span>
            )}
          </div>

          <div className="pt-5 text-center">
            <p className="text-[20px] mb-2">
              Already have an account &nbsp;
              <button onClick={() => navigate("/Signin")} className="underline">
                Sign In!
              </button>
            </p>
          </div>
          <div className="flex items-center justify-around mt-4">
            <button
              type="submit"
              className={`bg-[#9A3558] w-full text-white font-bold py-3 rounded-full text-lg`}
            >
              {loading ? "Loading..." : "Sign up "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
