import { useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { GoComment } from "react-icons/go";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { MdOutlineBookmarkBorder, MdOutlineBookmark } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
// import { getFormattedDate } from "../utilities/getFormattedDate";




import { useLocation, useNavigate } from "react-router-dom";
import { Post as post } from "../../types";
import { useAppSelector } from "../../store/hooks";
import { selectAuth } from "../../features/authSlice";

export const Post = ( {post}:{post:post}) => {

    const [postOptions, setPostOptions] = useState(false);

    const { pathname } = useLocation();

    // const {
    //     user: { users },
    //     auth: { token, userData },
    //     bookmarks: { bookmarks },
    // } = useSelector(state => state);
  const {user}=useAppSelector(selectAuth)

    const navigate = useNavigate();

    // const isBookmarked = bookmarks?.find(id => id === post?._id);

    // const isLiked = post?.likes?.likedBy?.find(user => user.username === userData.username);
const isLiked=false;
const isBookmarked =false;
    const dispatch = useDispatch();

    // const currentUser = users.find(user => user.username === post?.username);

    // const authUser = users.find(user => user.username === userData.username);

    // const editHandler = (e) => {
    //     e.stopPropagation();            // prevent the post content from re-occurring in new post
    //     dispatch(openPostModal());
    //     dispatch(setEditPostObj(post));
    //     setPostOptions(false);
    // }

    // const deletePostHandler = (e) => {
    //     e.stopPropagation();
    //     dispatch(deletePost({ postId: post?._id, token }));
    //     setPostOptions(false);
    // }

    // const unFollowHandler = (e) => {
    //     e.stopPropagation();
    //     dispatch(unFollowUser({ followUserId: currentUser?._id, token }));
    //     setPostOptions(false);
    // }

    // const followHandler = (e) => {
    //     e.stopPropagation();
    //     dispatch(followUser({ followUserId: currentUser?._id, token }));
    //     setPostOptions(false);
    // }

    return (
        <div
            className="flex border  ml-0 sm:mr-0 sm:mx-3 pl-2 pr-1 sm:pr-0 sm:px-5 py-3 bg-white hover:bg-slate-100 mt-5  rounded-3xl"
        >

            {/* <CreatePostModal /> */}

            <div className="mt-1 w-12 h-12 text-lg flex-none">
                <img
                    // onClick={() => navigate(`/profile/${currentUser?.username}`)}
                    // src={currentUser?.profilePicture}
                    className="flex-none w-12 h-12 rounded-full cursor-pointer"
                    // alt={currentUser?.username}
                    src="https://img.freepik.com/premium-vector/young-man-anime-style-character-vector-illustration-design-manga-anime-boy_147933-2539.jpg"
                />
            </div>

            <div className=" px-4 py-3">

                <div className=" flex justify-between relative">
                    <h2
                        // onClick={() => navigate(`/profile/${currentUser?.username}`)}
                        className="font-semibold cursor-pointer">
                        {/* {`${currentUser?.firstName} ${currentUser?.lastName}`} */} Abderrahim El-amarty
                        <span className="text-slate-500 font-normal pl-1.5">
                            {/* @{post?.username} */} Abderrahim
                        </span>
                    </h2>

                    <HiDotsHorizontal className="cursor-pointer mr-3" onClick={() => setPostOptions(prev => !prev)} />

                    {/* Post Options Modal */}

                    {post?.text === user?.name ? (
                        postOptions &&
                        <div
                            className="w-30 h-22 px-1 shadow-xl bg-white border border-slate-300 text-slate-600 font-semibold 
                                absolute right-7 top-0 z-20 rounded-xl">
                            <ul className="p-0.5 cursor-pointer text-start">
                                <li className="my-1 p-1 hover:bg-slate-200 rounded" >Edit Post</li>
                                <li className="my-1 p-1 hover:bg-slate-200 rounded" >Delete Post</li>
                            </ul>
                        </div>

                    // ) : authUser?.following.find(eachUser => eachUser?.username === post?.username) ? (
                    //     postOptions &&
                    //     <div className="w-30 h-22 px-1 shadow-xl bg-white border border-slate-300 text-slate-600 font-semibold 
                    //     absolute right-8 top-0 z-20 rounded-xl">
                    //         <ul className="p-0.5 cursor-pointer text-start">
                    //             <li className="my-1 p-1 hover:bg-slate-200 rounded" onClick={unFollowHandler}>Unfollow</li>
                    //         </ul>
                    //     </div>
                    ) : (postOptions &&
                        <div className="w-30 h-22 px-1 shadow-xl bg-white border border-slate-300 text-slate-600 font-semibold 
                        absolute right-8 top-0 z-20 rounded-xl">
                            <ul className="p-0.5 cursor-pointer text-start">
                                <li className="my-1 p-1 hover:bg-slate-200 rounded" >Follow</li>
                            </ul>
                        </div>
                    )}

                </div>

                <p
                    className="py-3 cursor-pointer max-w-lg break-words"
                    onClick={() => navigate(`/post/${post.id}`)}>
                    {post?.text}
                </p>

                {post?.image ? (<div 
                    className="max-w-3xl max-h-80 mx-auto bg-blue-100 rounded-md cursor-pointer"
                    onClick={() => navigate(`/post/${post.id}`)}>
                    <img
                        src={post?.image}
                        className="max-w-full max-h-80 rounded-md my-2 mx-auto"
                        alt="avatar"
                    />
                </div>) : null}

                <p className="text-sm text-gray-600"></p>

                <div className="flex justify-between pt-8">
                    <div className="flex">
                        {isLiked ? (
                            <BsSuitHeartFill className="text-xl cursor-pointer text-red-600" onClick={e => {
                                e.stopPropagation();
                                // dispatch(dislikePost({ postId: post?._id, token }));
                            }} />
                        ) : (
                            <BsSuitHeart className="text-xl cursor-pointer" onClick={e => {
                                e.stopPropagation();
                                // dispatch(likePost({ postId: post?._id, token }));
                            }} />
                        )}
                        <span className="text-sm pl-4 font-semibold">
                            {pathname.includes("post") ? "" : post?.likes ? post?.likes : null}
                        </span>
                    </div>

                    <div className="flex">
                        <GoComment onClick={() => navigate(`/post/${post.id}`)} className="text-xl cursor-pointer" />
                        <span className="text-sm pl-4 font-semibold">
                            {pathname.includes("post") ? "" : post?.comments > 0 ? post?.comments: ""}
                        </span>
                    </div>


                    {isBookmarked ? (
                        <MdOutlineBookmark className="text-xl cursor-pointer mr-3 text-blue-600" onClick={e => {
                            e.stopPropagation();
                            // dispatch(removeFromBookmark({ token, postId: post?._id }));
                        }} />
                    ) : (

                        <MdOutlineBookmarkBorder className="text-xl cursor-pointer mr-3" onClick={e => {
                            e.stopPropagation();
                            // dispatch(addToBookmark({ token, postId: post?._id }));
                        }} />
                    )}

                </div>
            </div>
        </div>
    )
};