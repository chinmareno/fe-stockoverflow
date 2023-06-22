import LoginForm from "../components/LoginForm";
import FormLayout from "../pages/Layout/FormLayout";

const Login = () => {
  return (
    <div className="flex h-screen  flex-col justify-center  items-center ">
      <FormLayout
        title="Welcome Back!"
        description="Don't have account?"
        navbutton="Register now"
        to="/user/signup"
      >
        <LoginForm />
      </FormLayout>
    </div>
  );
};

export default Login;
