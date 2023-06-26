import AccountCard from "../components/Card/AccountCard";
import AccountMenu from "../components/Menu/AccountMenu";

const Test = () => {
  return (
    <div className="w-screen h-screen bg-cyan-100 flex justify-center items-center border">
      <div className="rounded-3xl border bg-black   p-10 mb-60">
        {/* Put Your Component Down Here */}
        <AccountCard
          profile={{ image: "/assets/image/easy.svg", username: "hi" }}
          textColor="text-red-400"
          hoverColor="bg-pink-300"
          innerColor="bg-lime-500"
          outerColor="bg-blue-500"
        />
      </div>
    </div>
  );
};

export default Test;
