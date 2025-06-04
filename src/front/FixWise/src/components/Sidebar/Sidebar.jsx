import "./Sidebar.css";
import { ReactComponent as HomeIcon } from "../../assets/home-outline.svg";
import { ReactComponent as ConstructIcon } from "../../assets/construct-outline.svg";
import { ReactComponent as PeopleIcon } from "../../assets/people-outline.svg";
import { ReactComponent as PersonIcon } from "../../assets/person-outline.svg";
import ListSideBar from "../ListSideBar/ListSideBar";
import { IoMenu } from "react-icons/io5";
import { useState } from "react";

export default function Sidebar() {
  const [isOpen, setOpen] = useState(true);

  const handleMenu = () => {
    setOpen(!isOpen);
  };
  return (
    <aside
      className={`bg-gray-900 text-white p-4 transition-all duration-300  ${
        isOpen ? "w-70" : "w-14"
      }`}
    >
      <div className={`flex flex-wrap items-center w-full justify-between mt-2 mb-7 `}>
        <h2 className={`text-xl font-semibold ${isOpen ? "" : "hidden" }`}>FixWise</h2>
        <IoMenu onClick={handleMenu} className={`cursor-pointer text-2xl ${isOpen ? "" : "ml-2" }`} />
      </div>
      <ListSideBar />
    </aside>
  );
}
