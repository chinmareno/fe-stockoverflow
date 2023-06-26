import FooterAccountCard from "./FooterAccountCard";
import MainAccountCard from "./MainAccountCard";
import SignOutAccountCard from "./SignoutAccountCard";

const AccountCard = ({
  profile = "",
  outerColor,
  innerColor,
  hoverColor,
  textColor,
}) => {
  return (
    <>
      <div
        className={`${textColor} ${outerColor} text-white px-3 w-96 flex flex-col items-center rounded-t-3xl`}
      >
        <MainAccountCard
          className={`${innerColor} relative  w-full mt-2 flex flex-col  mb-1 rounded-xl `}
          profile={profile}
          innerColor={innerColor}
          hoverColor={hoverColor}
        />
      </div>
      <SignOutAccountCard
        className={`flex w-full ${textColor}  ${outerColor} py-2 pl-9 font-helvetica font-medium px-3 gap-4 hover:${hoverColor}`}
      />
      <FooterAccountCard
        className={`flex rounded-b-3xl border-t-2 py-2  ${textColor}  ${outerColor} items-center font-light text-xs gap-1 w-full   justify-center`}
        hoverColor={hoverColor}
      />
    </>
  );
};

export default AccountCard;
