import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../utils";

export const useCategories = () => {
  return useQuery({
    queryKey: "categories",
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/categories`);
      return data;
    },
  });
};

export const useUpdateUser = (toast, token) => {
  return useMutation({
    mutationFn: async (formData) => {
      const { data } = await axios.put(
        `${API_URL}/users/update-user/`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    },
    onError: (error, data) => {
      toast.error(error?.response?.data?.message ?? error.message);
    },
    onSuccess: (data) => {
      toast.success(data?.message);

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
  });
};
export const useCreatePost = (toast, token) => {
  return useMutation({
    mutationFn: async (formData) => {
      const { data } = await axios.post(
        `${API_URL}/posts/create-post`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data;
    },

    onError: async (error) => {
      toast.error(error?.response?.data?.message ?? error.message);
    },

    onSuccess: async (data) => {
      toast.success(data?.message);

      setTimeout(() => {
        window.location.replace("/blog");
      }, 2000);
    },
  });
};

export const useCreateTrip = (toast, token) => {
  return useMutation({
    mutationFn: async (formData) => {
      const { data } = await axios.post(`${API_URL}/trips/create`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },

    onError: async (error) => {
      toast.error(error?.response?.data?.message ?? error.message);
    },

    onSuccess: async (data) => {
      toast.success(data?.message);

      setTimeout(() => {
        window.location.replace(`/trip/${data.data._id}`);
      }, 1500);
    },
  });
};
export const useContent = (toast, token) => {
  return useMutation({
    mutationFn: async (page) => {
      const { data } = await axios.post(
        `${API_URL}/posts/client-content?page=${page}`,
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
        localStorage.removeItem("userInfo");
      }
    },
    onSuccess: (data) => {
      toast.success(data?.message);
    },
  });
};

export const useDeletePost = (toast, token, mutate) => {
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await axios.delete(`${API_URL}/posts/` + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message ?? error.message);
    },
    onSuccess: (data) => {
      toast.success(data?.message);
      mutate();
    },
  });
};

export const useUpdatePost = (toast, token) => {
  return useMutation({
    mutationFn: async ({ id, title, desc }) => {
      console.log(token);
      const { data } = await axios.patch(
        `${API_URL}/posts/update/${id}`,
        { title, desc },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data;
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message ?? error.message);
    },
    onSuccess: (data) => {
      toast.success(data?.message);

      window.location.reload();
    },
  });
};

export const useCreatePlant = (id, toast, token) => {
  return useMutation({
    mutationFn: async (formData) => {
      const { data } = await axios.post(
        `${API_URL}/plans/create/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    },

    onError: async (error) => {
      toast.error(error?.response?.data?.message ?? error.message);
    },

    onSuccess: async (data) => {
      toast.success(data?.message);

      setTimeout(() => {
        window.location.replace(`/trip/${data.data._id}`);
      }, 1500);
    },
  });
};

export const useUpdateTrip = (toast, token) => {
  return useMutation({
    mutationFn: async ({ id, tripName, city, startDate, endDate, image }) => {
      console.log(token);
      const { data } = await axios.patch(
        `${API_URL}/trips/update/${id}`,
        { tripName, city, startDate, endDate, image },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data;
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message ?? error.message);
    },
    onSuccess: (data) => {
      toast.success(data?.message);

      window.location.reload();
    },
  });
};