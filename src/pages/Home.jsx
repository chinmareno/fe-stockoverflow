import ButtonCard from "../components/Card/ButtonCard";
import Logo from "../components/Logo";
import OverviewCard from "../components/Card/OverviewCard";

const Home = () => {
  const features = [
    {
      img: "/assets/image/logisticbiru.svg",
      title: "Stock Management",
      description:
        "Efficiently manage your inventory by keeping track of the best-selling products and optimizing your stock levels.",
    },
    {
      img: "https://cdn2.unrealengine.com/video-game-revenue-c74196d72f94.svg",
      title: "Profit & Revenue calculation",
      description:
        "Instantly calculate your profits, revenue and providing you  valuable insights into your sales performance.",
    },
    {
      img: "https://cdn2.unrealengine.com/epic-games-wallet-2af74bb47a7a.svg",
      title: "Expense Tracking",
      description:
        "Keep a record of your business expenses, generate expense reports to monitor costs and optimize your spending.",
    },
    {
      img: "/assets/image/easy.svg",
      title: "Easy to use",
      description:
        "Add new products, update their details and track inventory levels with just a few clicks. ",
    },
    {
      img: "/assets/image/Invoice.svg",
      title: "digital invoice",
      description:
        "Join the digital revolution and contribute to saving the earth by using paperless invoice.",
    },
    {
      img: "/assets/image/Notifications_Isometric.svg",
      title: "Real-time Notifications",
      description:
        "Stay updated with real-time notifications for new orders, low stock alerts, and important updates about your business.",
    },
  ];

  return (
    <>
      {/* Logo Section */}
      <div className="mb-5 text-4xl w-11/12 lg:w-9/12 text-blackepicgame dark:text-lightgrey">
        <Logo />
      </div>
      {/* Hero Section */}
      <div className="grid rounded-md lg:w-9/12 mb-6 w-11/12 grid-cols-1 md:grid-cols-2 bg-gradient-to-br from-blue-400 via-blue-200 to-purple-500 dark:from-darkblueepicgame dark:via-navyblueepicgame dark:to-purpleepicgame ">
        <div className=" hidden md:flex justify-center items-center">
          <img src="https://cdn2.unrealengine.com/epic-games-store-self-service-publishing-tools-4554ceb470ed.webp" />
        </div>
        <ButtonCard
          img="/assets/image/Profitcalculation.svg"
          title="Everyone can be an entrepreneur"
          description="We are helping you to take the common business task so you can focus on the products itself "
          to="/user/signup"
          button="Sign Up today"
        />
      </div>
      {/* OverviewCard Section */}
      <div className="w-11/12 lg:w-9/12 grid-cols-1 pb-10 grid-flow-row gap-4 grid lg:grid-cols-3 ">
        {features.map(({ img, title, description }) => (
          <OverviewCard
            key={title}
            img={img}
            title={title}
            description={description}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
