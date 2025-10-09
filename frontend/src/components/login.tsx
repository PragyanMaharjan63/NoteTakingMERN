import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

type Formvalues = {
  UserName: string;
  Password: string;
};

export default function Login() {
  const [showpw, setShowpw] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Formvalues>();
  const onsubmit: SubmitHandler<Formvalues> = (data) => {
    console.log(data);
    reset();
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
          <input
            className="p-2 rounded-lg outline-none bg-white"
            type="text"
            placeholder="Enter your username"
            {...register("UserName", { required: true })}
          />
          {errors.UserName && (
            <p className="text-sm text-red-500">{errors.UserName.message}</p>
          )}
          <div className="relative">
            <input
              className=" p-2 rounded-lg outline-none bg-white"
              type={showpw ? "text" : "password"}
              placeholder="Enter your password"
              {...register("Password", {
                required: true,
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
