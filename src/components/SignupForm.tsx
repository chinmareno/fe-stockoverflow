import { useFormik } from "formik";
import { Form, NavLink, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { Button, TextField, useMediaQuery } from "@mui/material";
import { ChangeEvent, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { LoginErrorState } from "./LoginForm";
import useLoadingStore from "@/store/useLoadingStore";

interface SignupErrorState extends LoginErrorState {
  password2: string;
}
const SignupForm = () => {
  const { isSignupLoading, setIsSignupLoading } = useLoadingStore();
  const pattern = /^[a-zA-Z0-9]*$/;

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowPassword2, setIsShowPassword2] = useState(false);

  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };
  const handleShowPassword2 = () => {
    setIsShowPassword2(!isShowPassword2);
  };

  const [error, setError] = useState<SignupErrorState>({
    username: "",
    password: "",
    password2: "",
  });

  const navigate = useNavigate();

  const isMobile = useMediaQuery("(max-width:767px)");

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      password2: "",
    },

    onSubmit: async () => {
      const data = {
        username: formik.values.username.trim(),
        password: formik.values.password,
        password2: formik.values.password2,
      };
      try {
        setError({ username: "", password: "", password2: "" });
        if (data.username === "") {
          setError({
            username: "Username can't be empty",
            password: "",
            password2: "",
          });
          return;
        }
        if (4 > data.username.length) {
          setError({
            username: "Username min 4 characters",
            password: "",
            password2: "",
          });
          return;
        }
        if (data.username.length > 20) {
          setError({
            username: "Username max 20 characters",
            password: "",
            password2: "",
          });
          return;
        }
        if (!pattern.test(data.username)) {
          setError({
            username: "Username cannot contain special characters",
            password: "",
            password2: "",
          });
          return;
        }

        if (data.password === "") {
          setError({
            username: "",
            password: "Password can't be empty",
            password2: "",
          });
          return;
        }

        if (8 > data.password.length) {
          setError({
            username: "",
            password: "Password min 8 characters",
            password2: "",
          });
          return;
        }
        if (data.password.length > 128) {
          setError({
            username: "",
            password: "Password max 128 characters",
            password2: "",
          });
        }
        if (data.password2 === "") {
          setError({
            username: "",
            password: "",
            password2: "Please type again your password",
          });
          return;
        }
        if (data.password && data.password2) {
          if (data.password != data.password2) {
            setError({
              username: "",
              password: "",
              password2: "Password does not match",
            });
            return;
          }
        }
        const dataWithoutDoublePassword = {
          username: data.username,
          password: data.password,
        };
        setIsSignupLoading(true);
        const res = await axiosInstance.post(
          "/user/signup",
          dataWithoutDoublePassword
        );
        setIsSignupLoading(false);
        if (res.status == 201) {
          navigate("/items/home");
        }
      } catch (error: any) {
        setIsSignupLoading(false);
        const data = error.response.data;
        switch (data) {
          case "Username has been taken":
            setError({ username: data, password: "", password2: "" });
            break;
          case "Incorrect password":
            setError({
              username: "",
              password: data,
              password2: "",
            });
            break;
          default:
            console.log({ error });
        }
      }
    },
  });

  const handleFormInput = (e: ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue(e.target.name, e.target.value);
  };

  return (
    <>
      <NavLink to="/items/home">home</NavLink>
      <Form
        onSubmit={formik.handleSubmit}
        method="post"
        className="relative mt-9 flex  flex-col gap-8 "
      >
        <TextField
          error={error.username ? true : false}
          name="username"
          autoComplete="off"
          label="Username"
          size={isMobile ? "small" : "medium"}
          variant="filled"
          onChange={handleFormInput}
          helperText={error.username}
        />
        <TextField
          error={error.password ? true : false}
          name="password"
          autoComplete="off"
          label="Password"
          type={isShowPassword ? "text" : "password"}
          variant="filled"
          size={isMobile ? "small" : "medium"}
          onChange={handleFormInput}
          helperText={error.password}
        />
        <button
          type="button"
          className={`absolute right-2 ${
            (isMobile && error.password) || error.password2
              ? "bottom-[183px]"
              : "bottom-[156px]"
          } ${
            (!isMobile && error.password) || error.password2
              ? "bottom-[190px]"
              : "bottom-[169px]"
          }`}
          onClick={handleShowPassword}
        >
          {isShowPassword ? (
            <VisibilityOffIcon fontSize={isMobile ? "small" : "medium"} />
          ) : (
            <VisibilityIcon fontSize={isMobile ? "small" : "medium"} />
          )}
        </button>
        <TextField
          error={error.password2 ? true : false}
          name="password2"
          autoComplete="off"
          size={isMobile ? "small" : "medium"}
          label="Confirm password"
          type={isShowPassword2 ? "text" : "password"}
          variant="filled"
          onChange={handleFormInput}
          helperText={error.password2}
        />

        <button
          type="button"
          className={`absolute right-2 ${
            isMobile && error.password2 ? "bottom-[104px]" : "bottom-[79px]"
          } ${
            !isMobile && error.password2 ? "bottom-[104px]" : "bottom-[82px]"
          }`}
          onClick={handleShowPassword2}
        >
          {isShowPassword2 ? (
            <VisibilityOffIcon fontSize={isMobile ? "small" : "medium"} />
          ) : (
            <VisibilityIcon fontSize={isMobile ? "small" : "medium"} />
          )}
        </button>
        <Button disabled={isSignupLoading} variant="contained" type="submit">
          Continue
        </Button>
      </Form>
    </>
  );
};

export default SignupForm;
