import React from "react";
import { Link } from "react-router-dom";
import {
  Banner,
  Card,
  Pagination,
  PopularPosts,
  PopularWriters,
} from "../components";
import { usePopularPost, usePosts } from "../hooks/post_hooks";
import { CATEGORIES } from "../utils/dummyData";

const Home = () => {
  const { posts, numOfPages, setPage } = usePosts({
    writerId: "",
  });
  const popular = usePopularPost();

  const handlePageChange = (val) => {
    setPage(val);
  };

  const randomIndex = Math.floor(Math.random() * posts?.length);

  if (posts?.length < 1)
    return (
      <div className="w-full h-full py-8 flex items-center justify-center">
        <span className="text-lg text-slate-500">No Available</span>
      </div>
    );

  return (
    <div className="py-10 2xl:py-5">
      <div className="px-0 lg:pl-20 2xl:px-20 ">
        {/* Categories */}
        <div className="mt-6 md:mt-0">
          <p className="text-2xl font-semibold text-gray-600 dark:text-white">
            Hi,
          </p>
          <p className="text-2xl font-semibold text-gray-600 dark:text-white">
            Ngo Dung
          </p>
          <div className="w-full flex flex-wrap py-10 gap-8"></div>
        </div>

        {/* Blog Post */}
        <div className="w-full flex flex-col md:flex-row gap-10 2xl:gap-20">
          {/* LEFT */}
          <div className="w-full md:w-2/3 flex flex-col gap-y-28 md:gap-y-14">
            <div className="w-full flex items-cemter justify-center"></div>
          </div>
          {/* RIGHT */}
          <div className="w-full md:w-1/4 flex flex-col gap-y-12"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;