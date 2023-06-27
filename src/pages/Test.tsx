import AccountCard from "../components/Card/AccountCard";
import AccountMenu from "../components/Menu/AccountMenu";
import imagepagination from "../components/ImagePagination";

const Test = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center border bg-cyan-100">
      <div className="mb-60 rounded-3xl border   bg-black p-10">
        {/* Put Your Component Down Here */}
        <imagepagination />
      </div>
    </div>
  );
};

export default Test;
