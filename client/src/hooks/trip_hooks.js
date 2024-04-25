import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import useStore from "../store";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { updateURL } from "../utils";
import { API_URI } from "../utils/apiCalls";

export const useTrips = () => {
  const { setIsLoading, user, signOut } = useStore();

  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(searchParams.get("page") || 1);
  // const [category, setCategory] = useState(searchParams.get("cat") || "");
  const [trips, setTrips] = useState([]);
  const [numOfPages, setNumOfPages] = useState(1);
  const [errorOccurred, setErrorOccurred] = useState(false); // NEW

  useEffect(() => {
    const fetchTrips = async () => {
      updateURL({ page, navigate, location });

      setIsLoading(true);
      try {
        const token = user?.token; // Lấy token từ user nếu tồn tại

        const { data } = await axios.get(`${API_URI}trips?page=${page}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTrips(data?.data || []);
        setNumOfPages(data?.numOfPage || 0);
        setErrorOccurred(false); // NEW
      } catch (error) {
        setErrorOccurred(true); // NEW
        console.log(error); // NEW
      } finally {
        setIsLoading(false);
      }
    };

    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    fetchTrips();
  }, [page, user]);

  // NEW
  useEffect(() => {
    if (errorOccurred) {
      signOut();
      navigate("/sign-in");
      toast.error("Something went wrong.");
    }
  }, [errorOccurred, navigate, signOut]);

  return {
    trips,
    page,
    numOfPages,
    setPage,
  };
};
