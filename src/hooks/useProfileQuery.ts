import axiosInstance from "@/utils/axiosInstance";
import alderon from "../../db/alderon.json";
export interface IProfile {
  username: string;
  image: string;
}

const getProfile = async (): IProfile => {
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

const wait2 = (): Promise<IProfile> => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(alderon);
    }, 3000)
  );
};

export { propil, wait, wait2, getProfile };
