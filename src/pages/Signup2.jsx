import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { chatlas, logo, visibility, visibilityOff } from "../assets";
import { showToastError } from "../components/common/ShowToast";
import { styles } from "../styles";

const Signup2 = () => {
  const formContext = useForm();
  const { register, handleSubmit, formState, getValues } = formContext;
  const { errors } = formState;
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const buttonShadow = { boxShadow: "0 4px 4px rgba(0, 0, 0, 0.25)" };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      console.log(data);
      //   const response = await axios.post(
      //     "http://localhost:3000/api/v1/users/login",
      //     data
      //   );
      //   console.log(response);
      //   showToastSuccess(response.data.status);
    } catch (err) {
      showToastError(err.response?.data?.message);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const inputShadowStyle = {
    boxShadow: "inset 0px 4px 4px rgba(0, 0, 0, 0.25)",
  };

  const inputStyle =
    "w-full rounded-[6px] lg:rounded-[10px] p-[0.5em] font-['Inter'] lg:text-[1.35rem] text-[#757575]";

  return (
    <div
      className="flex justify-center items-center h-screen relative"
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
        <div className={`flex flex-col items-center justify-center`}>
          <h2 className="font-['Montserrat'] text-[2rem] lg:text-[3rem] font-bold">
            SIGN UP
          </h2>
          <p className={`font-['Inter'] lg:text-[1.35rem]`}>
            Glad to have you!
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2 mt-2">
            <label
              className={`font-["Montserrat"] font-bold text[1.25rem] lg:text-[1.35rem]`}
            >
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className={`${inputStyle}`}
              style={inputShadowStyle}
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

          <div className="mb-2">
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
              className={`font-["Montserrat"] font-bold text[1.25rem] lg:text-[1.35rem]`}
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="Confirm your password"
                className={`${inputStyle}`}
                style={inputShadowStyle}
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

          <div className="font-['Montserrat'] text-center lg:text-[1.35rem] pt-2">
            <p className="">
              Already have an account &nbsp;
              <button onClick={() => navigate("/Signin")} className="underline">
                Sign In!
              </button>
            </p>
          </div>
          <div className="flex items-center justify-around pt-5">
            <button
              type="submit"
              className={`w-[33%] font-["Inter"] bg-[#9A3558] hover:bg-[#AF476B] text-white font-bold text-[1.15rem] lg:text-[1.35rem] py-3 rounded-[10px] transition-all duration-100`}
              style={buttonShadow}
            >
              {loading ? "Loading..." : "Sign up "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup2;
