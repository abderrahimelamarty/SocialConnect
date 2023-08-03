import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


import { BiEditAlt, BiLogOut } from "react-icons/bi";
import { AiOutlineHome, AiFillHome  } from "react-icons/ai";
import { MdOutlineExplore, MdExplore, MdOutlineBookmarkBorder, MdOutlineBookmark } from "react-icons/md";
import { FaRegUser, FaUser } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logoutAsync, selectAuth } from "../../features/authSlice";
import React from "react";

export const Leftside = () => {
  

    const { user } = useAppSelector(selectAuth);
    const dispatch = useAppDispatch();
const handleLogout=(e:React.MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault();
    dispatch(logoutAsync())

}
   

    return (
        <aside className="hidden sm:block basis-1/6 lg:basis-1/5">

            <header className="flex font-bold text-blue-600 mx-5 my-4 text-xl xl:text-2xl">
                <Link to="/home"> SOCIALCONNECT</Link>
            </header>

         

            <nav className="bg-white p-3 rounded-3xl">
                <ul className="px-2 mr-1">
                    <li >
                        <NavLink to="/home" className="flex py-4 gap-3 px-3 cursor-pointer hover:bg-slate-200 rounded-[15rem] active:bg-slate-100">
                            {({ isActive }) => 
                                isActive ? (
                                    <>
                                        <AiFillHome className="text-[1.6rem] font-bold"/>  
                                        <h2 className="text-xl px-1 hidden xl:block font-bold"> Home </h2>
                                    </>
                                ) : (
                                    <>
                                        <AiOutlineHome className="text-[1.6rem]"/>
                                        <h2 className="text-xl px-1 hidden xl:block"> Home </h2>
                                    </>
                                )}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/explore" className="flex py-4 gap-3 px-3 cursor-pointer hover:bg-slate-200 rounded-[15rem] active:bg-slate-100">
                            {({ isActive }) => 
                                isActive ? (
                                    <>
                                        <MdExplore className="text-[1.6rem] font-bold"/> 
                                        <h2 className="text-xl px-1 hidden xl:block font-bold"> Explore </h2>
                                    </>
                                ) : (
                                    <>
                                        <MdOutlineExplore className="text-[1.6rem]"/>
                                        <h2 className="text-xl px-1 hidden xl:block"> Explore </h2>
                                    </>
                                )}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/bookmarks" className="flex py-4 gap-3 px-3 cursor-pointer hover:bg-slate-200 rounded-[15rem] active:bg-slate-100">
                            {({ isActive }) => 
                                isActive ? (
                                    <>
                                        <MdOutlineBookmark className="text-[1.6rem] font-bold"/> 
                                        <h2 className="text-xl px-1 hidden xl:block font-bold"> Bookmarks </h2>
                                    </>
                                ) : (
                                    <>
                                        <MdOutlineBookmarkBorder className="text-[1.6rem]"/>
                                        <h2 className="text-xl px-1 hidden xl:block"> Bookmarks </h2>  
                                    </>
                                )}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/profile" className="flex py-4 gap-3 px-3 cursor-pointer hover:bg-slate-200 rounded-[15rem] active:bg-slate-100">
                            {({ isActive }) => 
                                isActive ? (
                                    <>
                                        <FaUser className="text-[1.6rem] font-bold"/> 
                                        <h2 className="text-xl px-1 hidden xl:block"> Profile </h2>
                                    </>
                                ) : (
                                    <>
                                        <FaRegUser className="text-[1.6rem]"/>
                                        <h2 className="text-xl px-1 hidden xl:block"> Profile </h2>
                                    </>
                                )}
                        </NavLink>
                    </li>
                    <li>
                        <button onClick={handleLogout} className="flex py-4 gap-3 px-3 cursor-pointer hover:bg-slate-200 rounded-[15rem] active:bg-slate-100">
                           
                                    <>
                                        <BiLogOut className="text-[1.6rem] font-bold"/> 
                                        <h2 className="text-xl px-1 hidden xl:block"> LogOut </h2>
                                    </>
                               
                        </button>
                    </li>
                    <li className="my-2 mx-1">
                        <button 
                            className="hidden xl:block my-8 mx-0 p-2 rounded-[10rem] w-full text-x cursor-pointer text-center 
                            font-semibold text-white bg-blue-600 hover:bg-blue-800" 
                            >
                            Post
                        </button>

                        <BiEditAlt 
                            className="w-9 h-9 pl-0 rounded-full block xl:hidden cursor-pointer" 
                            >
                        </BiEditAlt>
                    </li>
                </ul>
            </nav>
        </aside>
    )
};