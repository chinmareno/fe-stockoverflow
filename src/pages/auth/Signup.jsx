import SignupForm from "../../components/SignupForm";
import FormLayout from "../../components/Layout/FormLayout";

const Signup = () => {
  return (
    <div className="flex h-screen  flex-col justify-center  items-center ">
      <FormLayout
        title="Create an account"
        description="Already have an account?"
        navbutton="Login"
        to="/user/login"
      >
        <SignupForm />
      </FormLayout>
    </div>
  );
};

export default Signup;
