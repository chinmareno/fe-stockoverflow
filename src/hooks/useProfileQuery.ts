import axiosInstance from "@/utils/axios";

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

export { propil, wait, getProfile };
