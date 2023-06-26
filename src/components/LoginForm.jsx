import { useFormik } from "formik";
import { Form, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

const LoginForm = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const [error, setError] = useState({ username: "", password: "" });

  const navigate = useNavigate();

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
          if (data.username === "")
            setError({ username: "Username can't be empty" });
          if (data.password === "")
            setError({ password: "Password can't be empty" });
          return;
        }

        const res = await axiosInstance.post("/user/login", data);
        console.log(res);
        if (res.status == 200) {
          navigate("/items");
        }
      } catch (error) {
        const errorData = error.response.data;
        console.log(error);
        console.log("erorr:" + error.res);
        switch (errorData) {
          case "Username not found":
            setError({ username: errorData });
            break;
          case "Incorrect password":
            setError({ password: errorData });
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
        className="flex relative text-xs flex-col gap-8 mt-9 "
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
        <Button variant="contained" type="submit">
          Login
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
