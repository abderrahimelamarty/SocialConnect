import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import { followUser, unFollowUser } from "../features/user/helpers";
import { User } from "../../types";
import { useAppSelector } from "../../store/hooks";
import { selectAuth } from "../../features/authSlice";

export const UserDetails = (CurrentUser:User) => {

 const {user}=useAppSelector(selectAuth)

    // const authUser = users.find(user => user.name === userData.username);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    return (
        <div className="ml-5 mt-8 mb-4 flex w-10/12 justify-around ">

            <div className="flex ">
                <img 
                    src="https://images8.alphacoders.com/122/1220491.jpg" 
                    className="w-12 h-12 rounded-full cursor-pointer" 
                    alt={`${CurrentUser?.name}`} 
                    onClick={() => navigate(`/profile`)}
                />

                <div className="w-40 flex flex-col px-2 ">
                    <Link to="/profile">
                        <h2 className="font-semibold">{`${CurrentUser?.name} ${CurrentUser?.name}`}</h2>
                        <h2> @{CurrentUser?.name} </h2>
                    </Link>
                </div>
            </div>
{/* 
            {authUser?.name === user?.name ? null : authUser?.following.find(eachUser => eachUser?.name === user?.name) ? (
            <button 
                className="mt-1.5 px-3 w-18 h-8 bg-blue-600 hover:bg-blue-800 text-white rounded-xl shadow-md hover:shadow-lg transition duration-150 ease-in-out" 
                onClick={() => dispatch(unFollowUser({ followUserId: user._id, token }))} >
                Unfollow
            </button>
            ) : ( */}
            <button 
                className="mt-1.5 px-3 w-18 h-8 bg-blue-600 hover:bg-blue-800 text-white rounded-xl shadow-md hover:shadow-lg transition duration-150 ease-in-out" 
                // onClick={() => dispatch(followUser({ followUserId: user._id, token }))} 
                >
                Follow
            </button>
            {/* )} */}
        </div>
    )
};