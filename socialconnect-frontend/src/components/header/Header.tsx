import HeaderLogo from "./HeaderLogo";
import HeaderNav from "./HeaderNav";
// import HeaderOptions from "./HeaderOptions";
import HeaderProfile from "./HeaderProfile";
import HeaderSearch from "./HeaderSearch";

const Header = () => {
  return (
    <header
      className="sticky top-0 z-50 flex items-center
      bg-white p-2 lg:px-5 shadow-md"
    >
      <div className="flex items-center">
        <HeaderLogo />
        <HeaderSearch />
      </div>
      <div className="flex flex-grow justify-center">
        <HeaderNav />
      </div>
      <div className="flex items-center justify-end sm:space-x-2">
        <HeaderProfile />
        {/* <HeaderOptions /> */}
      </div>
    </header>
  );
};

export default Header;