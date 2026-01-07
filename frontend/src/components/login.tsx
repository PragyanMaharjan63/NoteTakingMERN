import axios from "axios";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UseBackend } from "../contexts/context";

type Formvalues = {
  Email: string;
  Password: string;
};

export default function Login() {
  const { login } = UseBackend();
  const navigate = useNavigate();
  const [showpw, setShowpw] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Formvalues>();
  const onsubmit: SubmitHandler<Formvalues> = async (data) => {
    try {
      let req = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}api/auth/login`,
        {
          Email: data.Email,
          Password: data.Password,
        }
      );
      console.log(req.data);
      if (req.data.success) {
        setError("");
        reset();
        const UserName = req.data.user?.UserName || data.Email.split("@")[0];
        login(req.data.token, UserName);
        navigate("/");
      }
      setError(req.data.message);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="grid  h-svh justify-items-center items-center w-full ">
        <form
          onSubmit={handleSubmit(onsubmit)}
          className="grid gap-y-4 bg-white/60 p-4 justify-items-center rounded-xl"
        >
          <p className="text-[var(--heading-dark)] font-bold text-2xl ">
            LOGIN
          </p>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <input
            className="md:w-80 p-2 rounded-lg outline-none bg-white"
            type="text"
            placeholder="Enter your Email"
            {...register("Email", { required: "Please enter Your Email" })}
          />
          {errors.Email && (
            <p className="text-sm text-red-500">{errors.Email.message}</p>
          )}
          <div className="relative">
            <input
              className="md:w-80  p-2 rounded-lg outline-none bg-white"
              type={showpw ? "text" : "password"}
              placeholder="Enter your password"
              {...register("Password", {
                required: "Please enter your Password",
                min: { value: 8, message: "Password must be greater than 8" },
              })}
            />
            <p
              className="absolute right-2 top-2 cursor-pointer"
              onClick={() => {
                setShowpw((prev) => !prev);
              }}
            >
              {showpw ? <Eye /> : <EyeClosed />}
            </p>
          </div>
          {errors.Password && (
            <p className="text-sm text-red-500">{errors.Password.message}</p>
          )}
          <div className="flex gap-2 text-md text-[var(--heading-mid)]">
            Don't have an account?
            <p
              className="text-slate-600 underline cursor-pointer"
              onClick={() => navigate("/signin")}
            >
              Signin
            </p>
          </div>
          <input
            type="submit"
            value="Submit"
            className="bg-[var(--button-bg)] px-6 py-2 rounded-lg text-[var(--heading-dark)] shadow-md cursor-pointer hover:-translate-y-0.5"
          />
        </form>
      </div>
    </>
  );
}
