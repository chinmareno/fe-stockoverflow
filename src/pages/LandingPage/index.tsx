import useThemeStore from "@/store/useThemeStore";
import ButtonCard from "../../components/Card/ButtonCard";
import OverviewCard from "../../components/Card/OverviewCard";
import logisticlight from "@/assets/image/logisticlight.svg";
import logisticbiru from "@/assets/image/logisticbiru.svg";
import easy from "@/assets/image/easy.svg";
import Invoice from "@/assets/image/Invoice.svg";
import Notifications_Isometric from "@/assets/image/Notifications_Isometric.svg";

const LandingPage = () => {
  const { theme } = useThemeStore();
  const features = [
    {
      img: theme === "light" ? logisticlight : logisticbiru,
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
      img: easy,
      title: "Easy to use",
      description:
        "Add new products, update their details and track inventory levels with just a few clicks. ",
    },
    {
      img: Invoice,
      title: "digital invoice",
      description:
        "Join the digital revolution and contribute to saving the earth by using paperless invoice.",
    },
    {
      img: Notifications_Isometric,
      title: "Real-time Notifications (unavailable yet)",
      description:
        "Stay updated with real-time notifications for new orders, low stock alerts, and notification urself can customized.",
    },
  ];

  return (
    <div className="flex flex-col items-center    ">
      {/* Most Top Header */}
      <div className="font-helvetica mb-8 mt-3 w-screen animate-fade-right text-center text-3xl animate-once">
        Simple inventory control, prevent your Stockoverflow
      </div>
      {/* Hero Section */}
      <div className="mb-6  grid w-11/12 animate-fade-left  grid-cols-1 rounded-md bg-gradient-to-br from-blue-400 via-blue-200 to-purple-500 animate-once animate-ease-out dark:from-blue-950 dark:via-blue-800 dark:to-purple-900 md:grid-cols-2 lg:w-9/12 ">
        <div className=" hidden items-center justify-center md:flex">
          <img src="https://cdn2.unrealengine.com/epic-games-store-self-service-publishing-tools-4554ceb470ed.webp" />
        </div>
        <ButtonCard
          img={
            theme === "light"
              ? "@/assets/image/herolight.svg"
              : "@/assets/image/herodark.svg"
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
    </div>
  );
};

export default LandingPage;
