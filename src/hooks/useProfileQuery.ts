import axiosInstance from "@/utils/axiosInstance";
import alderon from "../../db/alderon.json";
export interface IProfile {
  username: string;
  image: string;
}

const getProfile = async (): <Promise<IProfile>> => {
  const res = await axiosInstance.get("/user/profile");
  return res.data;
};

const wait = (): Promise<IProfile> => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(propil);
    }, 5000)
  );
};

const propil = {
  username: "john doe",
  image: "https://github.com/shadcn.png",
};



export { propil,  getProfile };
