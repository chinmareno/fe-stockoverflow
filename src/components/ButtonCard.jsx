import { NavLink } from "react-router-dom";

const ButtonCard = (props) => {
  const { img, title, description, to, button } = props;
  return (
    <div className="grid rounded-md lg:w-9/12 mb-6 w-11/12 grid-cols-1 md:grid-cols-2 bg-gradient-to-br from-blue-400 via-blue-200 to-purple-500 dark:from-darkblueepicgame dark:via-navyblueepicgame dark:to-purpleepicgame ">
      {/* Left Section */}
      <div className=" hidden md:flex justify-center items-center">
        <img src="https://cdn2.unrealengine.com/epic-games-store-self-service-publishing-tools-4554ceb470ed.webp" />
      </div>
      {/* Right Section */}
      <div className=" flex flex-col text-black dark:text-white justify-center items-center    m-10 gap-6      ">
        <div className="w-32 flex justify-center items-center h-32">
          <img src={`/assets/image/${img}`} />
        </div>
        <h1 className="text-3xl font-semibold font-helvetica text-center ">
          {title}
        </h1>

        <NavLink className="bg-lightgrey rounded-md" to={to}>
          <button className="w-52 text-black text-xs  uppercase font-bold h-13">
            {button}
          </button>
        </NavLink>

        <h3 className="text-sm text-center   ">{description}</h3>
      </div>
    </div>
  );
};

export default ButtonCard;
