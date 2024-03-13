import { BsCodeSlash, BsNewspaper } from "react-icons/bs";
import { GiClothes } from "react-icons/gi";
import { MdCastForEducation, MdOutlineSportsHandball } from "react-icons/md";

export const CATEGORIES = [
  {
    label: "NEWS",
    color: "bg-[#e11d48]",
    text: "text-[#fff]",
    icon: <BsNewspaper />,
  },
  {
    label: "SPORTS",
    color: "bg-[#2563eb]",
    icon: <MdOutlineSportsHandball />,
  },
  {
    label: "CODING",
    color: "bg-[#000000]",
    icon: <BsCodeSlash />,
  },
  {
    label: "EDUCATION",
    color: "bg-[#ca8a04]",
    icon: <MdCastForEducation />,
  },
  {
    label: "FASHION",
    color: "bg-[#9333ea]",
    icon: <GiClothes />,
  },
];
