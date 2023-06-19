import LoginForm from "../components/LoginForm";
import FormLayout from "../pages/Layout/FormLayout";

const Login = () => {
  return (
    <div className="flex h-screen  flex-col justify-center  items-center ">
      <FormLayout
        title="Enter Your account"
        description="Not have any account yet?"
        navbutton="signup"
        to="/user/signup"
      >
        <LoginForm />
      </FormLayout>
    </div>
  );
};

export default Login;
