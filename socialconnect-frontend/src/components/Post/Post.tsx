import { useState } from "react";
import { HiDotsHorizontal, HiShare } from "react-icons/hi";
import { GoComment } from "react-icons/go";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { MdOutlineBookmarkBorder, MdOutlineBookmark } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
// import { getFormattedDate } from "../utilities/getFormattedDate";


import { RiArrowDownSLine } from "react-icons/ri";


import { useLocation, useNavigate } from "react-router-dom";
import { Post as post } from "../../types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectAuth } from "../../features/authSlice";
import { dislikePost, likePost } from "../../features/posts/postSlice";
import { BiSmile, BiWorld } from "react-icons/bi";
import { AiFillHeart, AiOutlineCamera, AiOutlineGif, AiOutlineHeart } from "react-icons/ai";
import { FaRegCommentAlt, FaShare } from "react-icons/fa";
import {PiShareFatBold} from'react-icons/pi'
import { FlareSharp } from "@mui/icons-material";
import { formatDistanceToNow } from "date-fns";
export const Post = ( {post}:{post:post}) => {

    const [postOptions, setPostOptions] = useState(false);
  const [postId,setPostId]=useState(post?.id);
  
    const { pathname } = useLocation();

    // const {
    //     user: { users },
    //     auth: { token, userData },
    //     bookmarks: { bookmarks },
    // } = useSelector(state => state);
  const {user}=useAppSelector(selectAuth)

    const navigate = useNavigate();

    // const isBookmarked = bookmarks?.find(id => id === post?._id);
    const userId:number=1;
     const isLiked = post?.likes?.find(user => user === userId);
          
          const isBookmarked =false;
          const dispatch = useAppDispatch();
          
            

          
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
    
    const getTimeAgo = (dateString: string): string => {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true });
    };
       const PostDate: string = post.timestamp
      const timeAgoString = getTimeAgo(PostDate);
    return (
        // <div
        //     className="flex border  ml-0 sm:mr-0 sm:mx-3 pl-2 pr-1 sm:pr-0 sm:px-5 py-3 bg-white hover:bg-slate-100 mt-5  rounded-3xl"
        // >

        //     {/* <CreatePostModal /> */}

        //     <div className="mt-1 w-12 h-12 text-lg flex-none">
        //         <img
        //             // onClick={() => navigate(`/profile/${currentUser?.username}`)}
        //             // src={currentUser?.profilePicture}
        //             className="flex-none w-12 h-12 rounded-full cursor-pointer"
        //             // alt={currentUser?.username}
        //             src="https://img.freepik.com/premium-vector/young-man-anime-style-character-vector-illustration-design-manga-anime-boy_147933-2539.jpg"
        //         />
        //     </div>

        //     <div className=" px-4 py-3">

        //         <div className=" flex justify-between relative">
        //             <h2
        //                 // onClick={() => navigate(`/profile/${currentUser?.username}`)}
        //                 className="font-semibold cursor-pointer">
        //                 {/* {`${currentUser?.firstName} ${currentUser?.lastName}`} */} Abderrahim El-amarty
        //                 <span className="text-slate-500 font-normal pl-1.5">
        //                     {/* @{post?.username} */} Abderrahim
        //                 </span>
        //             </h2>

        //             <HiDotsHorizontal className="cursor-pointer mr-3" onClick={() => setPostOptions(prev => !prev)} />

        //             {/* Post Options Modal */}

        //             {post?.text === user?.name ? (
        //                 postOptions &&
        //                 <div
        //                     className="w-30 h-22 px-1 shadow-xl bg-white border border-slate-300 text-slate-600 font-semibold 
        //                         absolute right-7 top-0 z-20 rounded-xl">
        //                     <ul className="p-0.5 cursor-pointer text-start">
        //                         <li className="my-1 p-1 hover:bg-slate-200 rounded" >Edit Post</li>
        //                         <li className="my-1 p-1 hover:bg-slate-200 rounded" >Delete Post</li>
        //                     </ul>
        //                 </div>

        //             // ) : authUser?.following.find(eachUser => eachUser?.username === post?.username) ? (
        //             //     postOptions &&
        //             //     <div className="w-30 h-22 px-1 shadow-xl bg-white border border-slate-300 text-slate-600 font-semibold 
        //             //     absolute right-8 top-0 z-20 rounded-xl">
        //             //         <ul className="p-0.5 cursor-pointer text-start">
        //             //             <li className="my-1 p-1 hover:bg-slate-200 rounded" onClick={unFollowHandler}>Unfollow</li>
        //             //         </ul>
        //             //     </div>
        //             ) : (postOptions &&
        //                 <div className="w-30 h-22 px-1 shadow-xl bg-white border border-slate-300 text-slate-600 font-semibold 
        //                 absolute right-8 top-0 z-20 rounded-xl">
        //                     <ul className="p-0.5 cursor-pointer text-start">
        //                         <li className="my-1 p-1 hover:bg-slate-200 rounded" >Follow</li>
        //                     </ul>
        //                 </div>
        //             )}

        //         </div>

        //         <p
        //             className="py-3 cursor-pointer max-w-lg break-words"
        //             onClick={() => navigate(`/post/${post.id}`)}>
        //             {post?.text}
        //         </p>

        //         {post?.image ? (<div 
        //             className="max-w-3xl max-h-80 mx-auto bg-blue-100 rounded-md cursor-pointer"
        //             onClick={() => navigate(`/post/${post.id}`)}>
        //             <img
        //                 src={post?.image}
        //                 className="max-w-full max-h-80 rounded-md my-2 mx-auto"
        //                 alt="avatar"
        //             />
        //         </div>) : null}

        //         <p className="text-sm text-gray-600"></p>

        //         <div className="flex justify-between pt-8">
        //             <div className="flex">
        //                 {isLiked ? (
        //                     <BsSuitHeartFill className="text-xl cursor-pointer text-red-600" onClick={e => {
        //                         e.stopPropagation();
        //                         dispatch(dislikePost( post?.id ));
        //                     }} />
        //                 ) : (
        //                     <BsSuitHeart className="text-xl cursor-pointer" onClick={e => {
        //                         e.stopPropagation();
        //                         dispatch(likePost(  post?.id ));
        //                     }} />
        //                 )}
        //                 <span className="text-sm pl-4 font-semibold">
        //                     {pathname.includes("post") ? "" : post?.likes ? post?.likes : null}
        //                 </span>
        //             </div>

        //             <div className="flex">
        //                 <GoComment onClick={() => navigate(`/post/${post.id}`)} className="text-xl cursor-pointer" />
        //                 <span className="text-sm pl-4 font-semibold">
        //                     {pathname.includes("post") ? "" : post?.comments > 0 ? post?.comments: ""}
        //                 </span>
        //             </div>


        //             {isBookmarked ? (
        //                 <MdOutlineBookmark className="text-xl cursor-pointer mr-3 text-blue-600" onClick={e => {
        //                     e.stopPropagation();
        //                     // dispatch(removeFromBookmark({ token, postId: post?._id }));
        //                 }} />
        //             ) : (

        //                 <MdOutlineBookmarkBorder className="text-xl cursor-pointer mr-3" onClick={e => {
        //                     e.stopPropagation();
        //                     // dispatch(addToBookmark({ token, postId: post?._id }));
        //                 }} />
        //             )}

        //         </div>
        //     </div>
        // </div>
        <div className="bg-white rounded-[1rem] px-5 py-4 mt-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center ">
            <div className="w-12 h-12">
              <img src="https://img.freepik.com/premium-vector/young-man-anime-style-character-vector-illustration-design-manga-anime-boy_147933-2539.jpg" className="rounded-full w-12 h-12" />
            </div>
            <div className="ml-3">
              <p className="font-bold ">{user.name}</p>
              <div className="flex">
                <p className="text-xs">
                  
                  {timeAgoString}
                </p>
                <BiWorld className="ml-1 shrink-0" />
              </div>
            </div>
          </div>
  
          <div className="w-5 h-5">
            <img src="https://miro.medium.com/v2/resize:fit:0/1*Js0Y20MwjcTnVAe7KjDXNg.png" />
          </div>
        </div>
        {/* Input */}
        <div className="my-3  ">
          <p>{post.text}</p>
        </div>
        {/* Image */}
        <div className="-mx-5">
          <img src={post.image} />
        </div>
        {/* Number of Likes + Buttons */}
        <div className="">
          <div className="flex justify-between text-[#8e8d8d] mt-1">
            <div className="flex items-center ">
              <div className=" w-[1.1rem] h-[1.1rem]">
              <AiFillHeart className="w-5 h-5" color="red"/>
              </div>
             
              <p className="pl-2 whitespace-nowrap  text-[15px] sm:text-[16px]">
                {`  ${post.likes.length} Likes`}
              </p>
            </div>
            <p className="whitespace-nowrap text-[15px] sm:text-[16px]">
              {`${post.comments} Comments`}
            </p>
          </div>
  
          <div className="border-b my-2"></div>
          <div className="flex justify-between mx-6">
            <div className="flex items-center"   >
            {isLiked ? (
                            <BsSuitHeartFill className="text-xl cursor-pointer text-red-600" onClick={e => {
                                e.stopPropagation();
                                dispatch(dislikePost( {postId,userId} ));
                              
                            }} />
                        ) : (
                            <BsSuitHeart className="text-xl cursor-pointer" onClick={e => {
                                e.stopPropagation();
                                dispatch(likePost( {postId,userId}  ));
                                
                                
                            }} />
                        )}
              <p className="pl-2 text-[18px]">Like</p>
            </div>
            <div className="flex items-center">
              <FaRegCommentAlt className="w-5 h-5" />
              <p className="pl-2 text-[18px]">Comment</p>
            </div>
            <div className="flex items-center">
              
            <PiShareFatBold className="w-5 h-5"/>
           
  
              <p className="pl-2 text-[18px] ">Share</p>
            </div>
          </div>
          <div className="border-b my-2"></div>
        </div>
  
        {/* Comment Section*/}
        <div className="max-h-60  overflow-y-auto  ">
          {/* <div className="flex justify-between text-[#8e8d8d]  ">
            <p>{`See ${post.comments} previous comments`}</p>
            <div className="flex items-center">
              
         
            </div>
          </div> */}
          <div className=" ">
            {/* First Comment */}
            {/* {comments.map((comment) => (
              <div key={comment.id} className="">
                <div className="flex items-center mt-3">
                  <div className="w-10 h-10">
                    <img src={comment.data().image} className="rounded-full" />
                  </div>
                  <p className="ml-2 font-bold">{comment.data().username}</p>
                  <p className="ml-2 ">{comment.data().comment}</p>
                </div>
                <div className="ml-[3rem] flex -mt-1.5">
                  <p className="mr-2">Like </p>
                  <p>Reply </p>
                </div>
              </div>
            ))} */}
          </div>
        </div>
        {/* Input*/}
        {/* <div className="flex items-center mt-4"> */}
          {/* <div className=" w-10 h-10 shrink-0">
            <img
              src=""
              className="rounded-full "
            />
          </div> */}
          {/* <div className="w-full ml-2 bg-[#f2f3f7] rounded-full flex items-center relative">
            <input
              type="text"
              placeholder="Write a comment "
              className="outline-0  p-2 rounded-full w-full bg-[#f2f3f7]"
            //   value={comment}
            //   onChange={(e) => setComment(e.target.value)}
            /> */}
          
  
            {/* <div className="mr-4 bg-blue-400 text-white rounded-full">
              <button className="font-bold  px-2 ">
                Post
              </button>
            </div> */}
          {/* </div> */}
        {/* </div> */}
      </div>
    )
};