import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { FiLogOut } from "react-icons/fi";
import { AiOutlineArrowUp } from "react-icons/ai";

import { Link } from "react-router-dom";
import { Leftside } from "../../components/LeftSide/Leftside";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectAuth } from "../../features/authSlice";
import { MobileNavBar } from "../../components/mobile/MobileNavBar";

export const Profile = () => {
    const { user } = useAppSelector(selectAuth);
    const useDispatch = useAppDispatch();
    const [showUpdateProfile, setShowUpdateProfile] = useState(false);
    const [followersInfoModal, setFollowersInfoModal] = useState(false);
    const [showFollowing, setShowFollowing] = useState(false);

    const { username } = useParams();

  

    // const currentUser = users.find(user => user.username === username);






    // const authUser = users.find(user => user.username === userData?.username);

    return (
        <div>
          <MobileNavBar />

            <div className="flex justify-center px-5 sm:px-32 md:mt-4">
                <div className="flex h-screen w-screen">

                    <Leftside />

                    <main className="md:mx-4 w-full sm:basis-2/3">

                        <header className="hidden sm:flex m-4 w-full justify-between">
                            <h1 className="text-xl">Profile</h1>
                            <FiLogOut className="mr-2 w-5 h-5 text-blue-700 cursor-pointer"/>
                        </header>

                        <header className="text-xl font-bold flex py-4 text-blue-600 sm:hidden justify-between">
                            <Link to="/home" id="hero-logo"> ALCON </Link>
                            <FiLogOut className="w-5 h-5 text-blue-700 cursor-pointer"  />
                        </header>

                     

                            <div className="sm:ml-5 my-6 flex flex-col space-between">

                                <div className="flex mx-auto gap-8">

                                    <img src="https://wallpapers-clan.com/wp-content/uploads/2023/02/anime-boy-black-pfp-33.jpg" className="w-32 h-32 rounded-full" alt="avatar" />

                                    <div className="flex flex-col mt-2">

                                        <h2 className="font-semibold">{user.name}</h2>

                                        <h2> @{user.email} </h2>

                                     
                                        <button
                                            className="border my-3 p-1 rounded-lg text-x cursor-pointer text-center font-semibold text-slate-600 bg-slate-200 hover:bg-slate-100"
                                            onClick={() => setShowUpdateProfile(true)} >
                                            Edit Profile
                                        </button> 
                                       

                                        {/* Modal for Edit Profile */}


                                    </div>
                                </div>

                                <div className="mt-4 flex flex-col items-center">
                                    <h2 className="font-semibold">this is my bio and you</h2>
                                    <h2 className="font-semibold text-blue-600">www.ask.com</h2>
                                </div>

                                <div className="flex gap-6 pl-4 mt-4 mb-16 justify-items-center mx-auto">

                                  

                                    <h3 className="text-base sm:text-xl cursor-pointer">
                                        6
                                        <span className="text-slate-600 text-base sm:text-xl"> posts
                                        </span>
                                    </h3>

                                    <h3
                                        className="text-base sm:text-xl cursor-pointer"
                                        onClick={() => {
                                            setFollowersInfoModal(true);
                                            setShowFollowing(true)
                                        }
                                        }>
                                        8
                                        <span className="text-slate-600 pl-1">
                                            following
                                        </span>
                                    </h3>

                                    <h3
                                        className="text-base sm:text-xl cursor-pointer"
                                        onClick={() => {
                                            setFollowersInfoModal(true);
                                            setShowFollowing(false)
                                        }
                                        }>
                                        8
                                        <span className="text-slate-600 pl-1">
                                            followers
                                        </span>
                                    </h3>

                                </div>

                                <h1 className="text-2xl text-center mb-6">Your Posts</h1>

                               

                            </div>
                    
                    </main>

                    
                    <a href="#">
                        <AiOutlineArrowUp className="hidden sm:block fixed bottom-0 right-20 bg-blue-300 text-slate-50 text-5xl p-3 rounded-full mb-2 mr-20 hover:bg-blue-500" />
                    </a>
                </div>
            </div>
        </div>
    )
};