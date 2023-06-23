import FooterAccountCard from "./FooterAccountCard";
import MainAccountCard from "./MainAccountCard";
import SignOutAccountCard from "./SignoutAccountCard";

const AccountCardTest = () => {
  return (
    <>
      <div className="bg-black pt-2 px-3 pb-4 rounded-sm w-full text-sm h-full flex">
        <div className=" bg-pink-200 pt-1 px-2 flex flex-col justify-between items-center rounded-3xl w-full h-full">
          <MainAccountCard />
          <div className="flex pl-7 mt-auto w-full font-semibold py-2 gap-8 hover:bg-cyan-300 bg-cyan-100">
            <SignOutAccountCard />
          </div>
          <div className="flex items-center  text-xs gap-1 mb-2 w-full border-t  justify-center bg-cyan-100">
            <FooterAccountCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountCardTest;
