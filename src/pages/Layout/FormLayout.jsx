import { NavLink } from "react-router-dom";
import { Typography } from "@mui/material";
import Logo from "../../components/Logo";

const FormLayout = (props) => {
  const { title, description, navbutton, children, to } = props;
  return (
    <div className=" flex justify-center items-center overflow-hidden p-0 m-0">
      <div className="flex flex-col justify-center  items-center border w-96 h-full  border-black  rounded-md px-8  pt-4 pb-11 ">
        <div className="my-6 text-4xl flex">
          <Logo fontSize={24} />
        </div>
        <Typography variant="h5" className="uppercase  ">
          {title}
        </Typography>
        {children}{" "}
        <div className="flex mt-5">
          <Typography variant="body2" className="pt-1 pr-1 ">
            {description}{" "}
          </Typography>
          <NavLink to={to}>
            <Typography
              variant="button"
              className="text-blue-500   hover:text-blue-800"
            >
              {navbutton}{" "}
            </Typography>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default FormLayout;
