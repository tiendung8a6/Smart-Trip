import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import useStore from "../store";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { updateURL } from "../utils";
import { API_URI } from "../utils/apiCalls";

export const usePopularPost = () => {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get(`${API_URI}posts/popular`);

        setPopular(data?.data);
      } catch (error) {
        toast.error("Something went wrong.");

        const err = error?.response?.data || error?.response;
        console.log(error);
      }
    };

    fetchPosts();
  }, []);

  return popular;
};

export const usePosts = ({ writerId }) => {
  console.log("writerId", writerId);
  const { setIsLoading } = useStore();

  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(searchParams.get("page") || 1);
  const [category, setCategory] = useState(searchParams.get("cat") || "");
  const [posts, setPosts] = useState([]);
  const [numOfPages, setNumOfPages] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      updateURL({ page, navigate, location, cat: category });

      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `${API_URI}posts?cat=${category}&page=${page}&writerId=${
            writerId || ""
          }`
        );

        setPosts(data?.data || []);
        setNumOfPages(data?.numOfPage || 0);
      } catch (error) {
        toast.error("Something went wrong.");

        const err = error?.response?.data || error?.response;
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    fetchPosts();
  }, [page, writerId]);

  return {
    posts,
    page,
    numOfPages,
    setPage,
  };
};
