import { SVGProps } from "react";

interface HeaderNavIconProps {
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  active?: boolean;
}

const HeaderNavIcon: React.FC<HeaderNavIconProps> = ({
  Icon,
  active = true,
}) => {
  return (
    <div
      className="group flex items-center cursor-pointer rounded-xl
      md:px-10 sm:h-14 md:hover:bg-gray-100 active:border-b-2
      active:border-blue-500 transition-colors duration-200
      ease-in-out"
    >
      <Icon
        className={`h-5 sm:h-7 text-center text-gray-500 mx-auto 
        group-hover:text-blue-500 transition-colors duration-200
        ease-in-out ${active && "color-blue-500"}`}
      />
    </div>
  );
};

export default HeaderNavIcon;