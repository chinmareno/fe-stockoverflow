import { useFormik } from "formik";
import { Form, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios";
import { Button, TextField } from "@mui/material";
import { useState } from "react";

const SignupForm = () => {
  const pattern = /^[a-zA-Z0-9]*$/;

  const [error, setError] = useState({
    username: "",
    password: "",
    password2: "",
  });
  const navigate = useNavigate();
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
        if (data.username.password < 8) {
          setError({ username: "Username must have atleast 8 characters" });
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

        const res = await axiosInstance.post("/user/signup", data);
        console.log(res);
        if (res.status == 201) {
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
        <TextField
          error={error.password2 ? true : false}
          name="password2"
          autoComplete="off"
          label="Confirm password"
          type="password"
          variant="filled"
          className={input}
          onChange={handleFormInput}
          helperText={error.password2}
        />

        <Button variant="contained" type="submit">
          Continue
        </Button>
      </Form>
    </>
  );
};

export default SignupForm;
