import { Theme } from "@/store/profileStore";
import axiosInstance from "@/utils/axios";
import { useMutation } from "@tanstack/react-query";

const useProfileMutation = useMutation({
  mutationFn: updateProfile,
});
