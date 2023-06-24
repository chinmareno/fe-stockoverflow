import { useFormik } from "formik";
import { Form, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios";
import { Button, TextField, useMediaQuery } from "@mui/material";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const SignupForm = () => {
  const pattern = /^[a-zA-Z0-9]*$/;

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowPassword2, setIsShowPassword2] = useState(false);

  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };
  const handleShowPassword2 = () => {
    setIsShowPassword2(!isShowPassword2);
  };

  const [error, setError] = useState({
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
        setError({ username: null, password: null, password2: null });
        if (!pattern.test(data.username)) {
          setError({
            username: "Username cannot contain special characters",
          });
          return;
        }
        if (data.username.length < 4) {
          setError({ username: "Username must have atleast 4 characters" });
          return;
        }
        if (data.password.length < 8) {
          setError({ password: "Password must have atleast 8 characters" });
          return;
        }

        if (data.username === "") {
          setError({ username: "Username can't be empty" });
          return;
        }
        if (data.password === "") {
          setError({ password: "Password can't be empty" });
          return;
        }
        if (data.password2 === "") {
          setError({ password2: "Please type again your password" });
          return;
        }
        if (data.password && data.password2) {
          if (data.password != data.password2) {
            setError({ password2: "Password not matches" });
            return;
          }
        }
        const dataWithoutDoublePassword = {
          username: data.username,
          password: data.password,
        };
        const res = await axiosInstance.post(
          "/user/signup",
          dataWithoutDoublePassword
        );

        console.log(res);
        if (res.status == 201) {
          // navigate("/items");
        }
      } catch (error) {
        const data = error.response.data;
        console.log(error);
        switch (data) {
          case "Username not found":
            setError({ username: data });
            break;
          case "Incorrect password":
            setError({ password: data });
            break;
          default:
            console.log({ error });
        }
      }
    },
  });

  const handleFormInput = (e) => {
    formik.setFieldValue(e.target.name, e.target.value);
  };
  //styles
  const input = "my-12 text-blackepicgame dark:text-lightgrey";

  return (
    <>
      <Form
        onSubmit={formik.handleSubmit}
        method="post"
        className="flex flex-col relative  gap-8 mt-9 "
      >
        <TextField
          error={error.username ? true : false}
          name="username"
          autoComplete="off"
          label="Username"
          size={isMobile ? "small" : "medium"}
          variant="filled"
          className={input}
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
          className={input + "mr-9"}
          onChange={handleFormInput}
          helperText={error.password}
        />
        <button
          type="button"
          className={`absolute right-2 ${
            error.password || error.password2
              ? "bottom-[188px]"
              : "bottom-[165px]"
          }`}
          onClick={handleShowPassword}
        >
          {isShowPassword ? (
            <VisibilityOffIcon fontSize="small" />
          ) : (
            <VisibilityIcon fontSize="small" />
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
          className={input}
          onChange={handleFormInput}
          helperText={error.password2}
        />

        <button
          type="button"
          className={`absolute right-2 ${
            error.password2 ? "bottom-[102px]" : "bottom-[79px]"
          }`}
          onClick={handleShowPassword2}
        >
          {isShowPassword2 ? (
            <VisibilityOffIcon fontSize="small" />
          ) : (
            <VisibilityIcon fontSize="small" />
          )}
        </button>
        <Button variant="contained" type="submit">
          Continue
        </Button>
      </Form>
    </>
  );
};

export default SignupForm;
