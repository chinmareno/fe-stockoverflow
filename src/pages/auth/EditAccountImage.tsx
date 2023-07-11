import BlurScreenWrapper from "@/components/BlurScreenWrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { wait } from "@/hooks/useProfileQuery";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import axiosInstance from "@/utils/axiosInstance";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Loading from "@/components/Loading";

const EditAccountImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null); // New state for previewing the selected image

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
    if (selectedImage) {
      const formData = new FormData();
      formData.append("image", selectedImage);
      try {
        await axiosInstance.patch("/change-image", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        cache.invalidateQueries(["profile"]);
        toast({
          description: "Image upload successfully",
          duration: 3000,
        });
      } catch (error) {
        toast({
          variant: "destructive",
          description: "Failed to upload image",
          duration: 5000,
        });
      }
    }
  };

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: () => wait(),
    placeholderData: { username: "Guest" },
  });

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center space-y-3 overflow-y-hidden bg-cyan-100">
      {isUploading && (
        <BlurScreenWrapper>
          <Loading />
        </BlurScreenWrapper>
      )}
      <Avatar className="h-60 w-60 sm:h-80 sm:w-80 md:h-96 md:w-96 lg:h-[500px] lg:w-[500px] ">
        <AvatarImage src={previewImage || profile?.image} />
        <AvatarFallback className="bg-inherit">
          {profile?.username}
        </AvatarFallback>
      </Avatar>

      <input
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
          Cancel
        </Button>
      </NavLink>
    </div>
  );
};

export default EditAccountImage;
