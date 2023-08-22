// import { FlagIcon, PlayIcon, ShoppingCartIcon } from "@heroicons/react/outline";
// import { HomeIcon, UserGroupIcon } from "@heroicons/react/solid";
import HeaderNavIcon from "./HeaderNavIcon";
import { BsFillFlagFill } from "react-icons/bs";
import { AiOutlineHome, AiOutlinePlayCircle, AiOutlineShoppingCart } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";

const HeaderNav = () => {
  return (
    <div className="flex space-x-6 md:space-x-2">
      <HeaderNavIcon Icon={AiOutlineHome} active />
      <HeaderNavIcon Icon={BsFillFlagFill} />
      <HeaderNavIcon Icon={AiOutlinePlayCircle} />
      <HeaderNavIcon Icon={AiOutlineShoppingCart} />
      <HeaderNavIcon Icon={FaUsers} />
    </div>
  );
};

export default HeaderNav;