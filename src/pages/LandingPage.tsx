import useThemeContext from "@/hooks/useThemeContext";
import ButtonCard from "../components/Card/ButtonCard";
import OverviewCard from "../components/Card/OverviewCard";
import { ThemeContextType } from "@/context/ThemeProvider";

const LandingPage = () => {
  const { theme } = useThemeContext() as ThemeContextType;

  const features = [
    {
      img:
        theme === "light"
          ? "/assets/image/logisticlight.svg"
          : "/assets/image/logisticbiru.svg",
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
      title: "Real-time Notifications (unavailable yet)",
      description:
        "Stay updated with real-time notifications for new orders, low stock alerts, and notification urself can customized.",
    },
  ];

  return (
    <>
      {/* Logo Section */}
      <div className="mb-8 text-center font-mono text-2xl">
        Simple inventory control, prevent your Stockoverflow
      </div>
      {/* Hero Section */}
      <div className="mb-6 grid w-11/12 grid-cols-1 rounded-md bg-gradient-to-br from-blue-400 via-blue-200 to-purple-500 dark:from-darkblueepicgame dark:via-navyblueepicgame dark:to-purpleepicgame md:grid-cols-2 lg:w-9/12 ">
        <div className=" hidden items-center justify-center md:flex">
          <img src="https://cdn2.unrealengine.com/epic-games-store-self-service-publishing-tools-4554ceb470ed.webp" />
        </div>
        <ButtonCard
          img={
            theme === "light"
              ? "/assets/image/herolight.svg"
              : "/assets/image/herodark.svg"
          }
          title="Everyone can be an entrepreneur"
          description="We are helping you to take the common business task so you can focus on the products itself "
          to="/user/signup"
          buttonTitle="Sign Up For free"
        />
      </div>
      {/* OverviewCard Section */}
      <div className="grid w-11/12 grid-flow-row grid-cols-1 gap-4 pb-10 lg:w-9/12 lg:grid-cols-3 ">
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

export default LandingPage;
