import BlurScreenWrapper from "@/components/BlurScreenWrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { wait } from "@/hooks/useProfileQuery";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import axiosInstance from "@/utils/axiosInstance";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Loading from "@/components/Loading";

const EditAccountImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null); // New state for previewing the selected image
  const nav = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);

    // Generate a temporary URL for the selected image
    const imageURL = URL.createObjectURL(file);
    setPreviewImage(imageURL);
  };
  const cache = useQueryClient();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    try {
      if (!selectedImage) {
        toast({
          description: "There's no image file u choose yet",
          duration: 3000,
        });
        return;
      }
      setIsUploading(true);
      const formData = new FormData();
      console.log(selectedImage);
      formData.append("image", selectedImage);
      await axiosInstance.patch("/user/change-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      cache.invalidateQueries(["profile"]);
      toast({
        description: "Image upload successfully",
        duration: 3000,
      });
      setIsUploading(false);
      nav(-1);
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to upload image",
        duration: 5000,
      });
      setIsUploading(false);
    }
  };

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/user/profile");
      return data;
    },
    placeholderData: { username: "Guest" },
  });
  const [image, setImage] = useState("");
  useEffect(() => {
    if (profile.image)
      setImage(import.meta.env.VITE_SERVER_URL + "/" + profile.image);
  }, [profile]);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center space-y-3 overflow-y-hidden bg-cyan-100">
      {isUploading && (
        <BlurScreenWrapper>
          <Loading />
        </BlurScreenWrapper>
      )}
      <Avatar className="h-60 w-60 sm:h-80 sm:w-80 md:h-96 md:w-96 lg:h-[500px] lg:w-[500px] ">
        <AvatarImage src={previewImage || image} />
        <AvatarFallback className="bg-inherit">
          {profile?.username}
        </AvatarFallback>
      </Avatar>

      <input
        required
        className="ml-24"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      <Button
        className="mr-2 mt-3 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
        onClick={handleUpload}
      >
        Upload
      </Button>
      <NavLink to="/items/home">
        <Button className="mr-2 rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-700">
          Back
        </Button>
      </NavLink>
    </div>
  );
};

export default EditAccountImage;
