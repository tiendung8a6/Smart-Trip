import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../utils";

export const useFollowers = (toast, token) => {
  return useMutation({
    mutationFn: async (page) => {
      const { data } = await axios.post(
        `${API_URL}/posts/admin-followers?page=${page}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    },
    onError: (error) => {
      const errMsg = error?.response?.data?.message;
      toast.error(errMsg ?? error.message);
      if (errMsg === "Authentication failed") {
        localStorage.removeItem("user");
      }
    },
    onSuccess: (data) => {
      toast.success("Loaded Successfully");
    },
  });
};
