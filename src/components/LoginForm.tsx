import { useFormik } from "formik";
import { Form, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import useLoadingStore from "@/store/useLoadingStore";

export interface LoginErrorState {
  username: string;
  password: string;
}

const LoginForm = () => {
  const { isLoginLoading, setIsLoginLoading } = useLoadingStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (document.cookie) {
      (async () => {
        try {
          const res = await axiosInstance.get("/user/profile");
          if (res.status == 200) {
            navigate("/items");
          }
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, []);

  const [isShowPassword, setIsShowPassword] = useState(false);
  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const [error, setError] = useState<LoginErrorState>({
    username: "",
    password: "",
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    onSubmit: async () => {
      const data = {
        username: formik.values.username.trim(),
        password: formik.values.password,
      };
      try {
        setError({ username: "", password: "" });
        if (data.username === "" || data.password === "") {
          if (!data.username && !data.password) {
            setError({
              username: "Username can't be empty",
              password: "Password can't be empty",
            });
            return;
          }
          if (data.username)
            if (data.username === "") {
              setError({ username: "Username can't be empty", password: "" });
            }

          if (data.password === "") {
            setError({ username: "", password: "Password can't be empty" });
          }
          return;
        }
        if (4 > data.username.length) {
          setError({
            username: "Username length min 4 characters",
            password: "",
          });
          return;
        }
        if (data.username.length > 20) {
          setError({
            username: "Username length max 20 characters",
            password: "",
          });
          return;
        }
        if (8 > data.password.length) {
          setError({
            username: "",
            password: "Password length min 8 characters",
          });
          return;
        }
        if (data.password.length > 128) {
          setError({
            username: "",
            password: "Password length max 128 characters",
          });
          return;
        }
        setIsLoginLoading(true);
        const res = await axiosInstance.post("/user/login", data);
        setIsLoginLoading(false);
        console.log(res);
        navigate("/items/home");
      } catch (error: any) {
        setIsLoginLoading(false);
        const errorData = error.response.data;
        console.log(error);
        console.log("erorr:" + error.res);
        switch (errorData) {
          case "Username not found":
            setError({ username: errorData, password: "" });
            break;
          case "Incorrect password":
            setError({ username: "", password: errorData });
            break;
          default:
            console.log({ error });
        }
      }
    },
  });

  return (
    <>
      <Form
        onSubmit={formik.handleSubmit}
        method="post"
        className="relative mt-9 flex flex-col gap-8 text-xs "
      >
        <TextField
          error={error.username ? true : false}
          name="username"
          autoComplete="off"
          label="Username"
          variant="filled"
          onChange={formik.handleChange}
          helperText={error.username}
        />

        <TextField
          error={error.password ? true : false}
          name="password"
          autoComplete="off"
          label="Password"
          type={isShowPassword ? "text" : "password"}
          variant="filled"
          onChange={formik.handleChange}
          helperText={error.password}
        />
        <button
          type="button"
          className={`absolute right-2 ${
            error.password ? "bottom-[105px]" : " bottom-[84px]"
          }`}
          onClick={handleShowPassword}
        >
          {isShowPassword ? (
            <VisibilityOffIcon fontSize="small" />
          ) : (
            <VisibilityIcon fontSize="small" />
          )}
        </button>
        <Button variant="contained" disabled={isLoginLoading} type="submit">
          Login
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
