import SignupForm from "../components/SignupForm";
import FormLayout from "../pages/Layout/FormLayout";

const Signup = () => {
  return (
    <div className="flex h-screen  flex-col justify-center  items-center ">
      <FormLayout
        title="Create an account"
        description="Already have an account?"
        navbutton="login"
        to="/user/login"
      >
        <SignupForm />
      </FormLayout>
    </div>
  );
};

export default Signup;
