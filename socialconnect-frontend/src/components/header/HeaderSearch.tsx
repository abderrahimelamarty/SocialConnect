
import { AiOutlineSearch } from "react-icons/ai";

const HeaderSearch = () => {
  return (
    <div
      className="flex items-center ml-2 bg-gray-100 p-2
      rounded-full"
    >
      <AiOutlineSearch className="h-6 text-gray-600" />
      <input
        type="text"
        placeholder="Search Facebook"
        className="hidden md:inline-flex items-center ml-2 bg-transparent outline-none
        placeholder-gray-500 flex-shrink"
      />
    </div>
  );
};

export default HeaderSearch;