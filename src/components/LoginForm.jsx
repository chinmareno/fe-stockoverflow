import { useFormik } from "formik";
import { Form, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios";
import { Button, TextField } from "@mui/material";
import { useState } from "react";

const LoginForm = () => {
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
  const input = "my-12";

  return (
    <>
      <Form
        onSubmit={formik.handleSubmit}
        method="post"
        className="flex flex-col gap-8 mt-9 "
      >
        <TextField
          error={error.username ? true : false}
          name="username"
          autoComplete="off"
          label="Username"
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
          type="password"
          variant="filled"
          className={input}
          onChange={handleFormInput}
          helperText={error.password}
        />

        <Button variant="contained" type="submit">
          Login
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
