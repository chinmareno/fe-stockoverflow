import ButtonCard from "../components/ButtonCard";
import Logo from "../components/Logo";
import OverviewCard from "../components/OverviewCard";
import PublicIcon from "@mui/icons-material/Public";

const Home = () => {
  const features = [
    {
      img: "/Stockmanagement.svg",
      title: "Stock Management",
      description: "You don't need to worry about your stock overflow again.",
    },
    {
      img: "/Profitcalculation.svg",
      title: "Profit calculation",
      description: "Help you show your profit immediately after sales.",
    },
  ];

  return (
    // Logo Section
    <div className="pt-8 w-screen flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-blackepicgame">
      <div className="text-4xl w-11/12 lg:w-9/12 text-blackepicgame dark:text-lightgrey">
        <Logo />
      </div>
      {/* Hero Section */}
      <ButtonCard
        img="Stockmanagement.svg"
        title="Now open to all developer assdadqwd"
        description="Don't need to count stock again when sales or purchase occurs.hehehehhehehe hehhheheh  "
        to="/user/signup"
        button="Sign Up today"
      />
      {/* OverviewCard Section */}
      <div className="w-11/12 lg:w-9/12 grid-cols-1 grid-flow-row gap-6 grid lg:grid-cols-3 ">
        {features.map(({ img, title, description }) => (
          <OverviewCard
            key={title}
            img={img}
            title={title}
            description={description}
          />
        ))}
        <OverviewCard img="/Invoice.svg" title="Digital invoice">
          Save earth
          <PublicIcon className="text-18 mx-1 mb-1" />
          say no to traditional paper invoice
        </OverviewCard>
      </div>
    </div>
  );
};

export default Home;
