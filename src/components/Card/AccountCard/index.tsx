import IProfile from "@/utils/interface/IProfile";
import FooterAccountCard from "./FooterAccountCard";
import MainAccountCard from "./MainAccountCard";
import SignOutAccountCard from "./SignoutAccountCard";
import { FontSize } from "@/components/Button/ChangeAnotherAccountButton";

interface AccountCardProps {
  profile: IProfile;
  outerColor: string;
  innerColor: string;
  hoverColor?: string;
  textColor?: string;
  iconSize: FontSize;
}
const AccountCard = ({
  profile,
  outerColor,
  innerColor,
  hoverColor,
  textColor,
  iconSize,
}: AccountCardProps) => {
  return (
    <>
      <div
        className={`${textColor} ${outerColor} flex w-96 flex-col items-center rounded-t-3xl px-3 text-white`}
      >
        <MainAccountCard
          iconSize={iconSize}
          className={`${innerColor} relative  mb-1 mt-2 flex w-full  flex-col rounded-xl `}
          profile={profile}
          innerColor={innerColor}
          hoverColor={hoverColor}
        />
      </div>
      <SignOutAccountCard
        className={`flex w-full ${textColor}  ${outerColor} gap-4 px-3 py-2 pl-9 font-helvetica font-medium hover:${hoverColor}`}
      />
      <FooterAccountCard
        className={`flex rounded-b-3xl border-t-2 py-2  ${textColor}  ${outerColor} w-full items-center justify-center gap-1 text-xs   font-light`}
        hoverColor={hoverColor}
      />
    </>
  );
};

export default AccountCard;