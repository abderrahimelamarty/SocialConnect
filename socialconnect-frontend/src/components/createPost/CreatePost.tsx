import React, { useRef, useState } from 'react'
import { AiFillVideoCamera, AiOutlineSmile } from 'react-icons/ai'
import { BsFillEmojiSmileFill } from 'react-icons/bs'
import { GrGallery } from 'react-icons/gr'
import {IoMdPhotos} from'react-icons/io'
import { createPost } from '../../features/posts/postSlice'
import { useAppDispatch } from '../../store/hooks'
function CreatePost() {
  const [showFilterPostModal, setShowFilterModal] = useState(false);

  const [sortPostBy, setSortPostBy] = useState("Latest");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const [content, setContent] = useState("");

  const [postImageUrl, setPostImageUrl] = useState("");

  const [isFetching, setIsFetching] = useState(false);
  const [loading, setLoading] = useState(false);
  const cloudinaryUrl = "https://api.cloudinary.com/v1_1/dytvl1fnk/image/upload";
const dispatch=useAppDispatch()
const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
    setPostImageUrl(file)
};
  const postHandler = async (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    const userId:number=1;
    if (postImageUrl) {
        const file = postImageUrl;
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "alcon-social");
        formData.append("folder", "alcon");

        try {
            const res = await fetch(cloudinaryUrl, {
                method: "POST",
                body: formData,
            });

            const { url } = await res.json();

            dispatch(createPost({userId,content,postImageUrl}));
            setLoading(false);

        } catch (err) {
            console.error("error occured", err);
        }
        
    } else {
        dispatch(createPost({userId,content,postImageUrl}));
    }
    setContent("");
    setPostImageUrl("");
}
  return (
    <div>
         <div className="w-screen sm:w-full md:w-full ">
      <div className="max-w-[25rem] sm:max-w-[33rem] mx-auto  sm:px-2 bg-white rounded-[1rem] ">
        <div className=" mt-8 flex items-center w-full p-3 pt-4 ">
          <div className="w-12 h-12 shrink-0">
            <img
              src="https://i.pinimg.com/1200x/44/93/ba/4493ba550a87d4ba71da103dfcab07e5.jpg"
              className="rounded-full "
            />
          </div>
          <div className="flex items-center ml-5 w-full  ">
            <input
              type="text"
              value={content}
              placeholder="What's on your mind Joe Doe?"
              className="outline-0 bg-[#f2f3f7] p-1 rounded-full pl-3 w-full h-12 truncate"
          
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div
            className="flex items-center bg-blue-500 px-3 rounded-full h-10 ml-4"
         
          >
            <button className="font-bold text-white"  onClick={postHandler}>
              {loading ? "Loading" : "Post"}
              
            </button>
          </div>
        </div>

        <div className="">
          {postImageUrl ? (
            <div className="" onClick={() => setPostImageUrl("")}>
              <img src={postImageUrl} className="p-4" alt="" />
            </div>
          ) : (
            ""
          )}
        </div>

        <div
          className="
        border-b mb-4 mt-2"
        ></div>
        <div className="flex justify-between px-3 sm:mx-9 pb-3">
          <div className="flex items-center">
           
           < AiFillVideoCamera className="w-7 h-7" color='red'/>
            
            <p className="pl-2   font-bold text-gray-400 whitespace-nowrap text-[14px]">Live Video</p>
          </div>

          <div
            className="flex items-center"
            // onClick={() => imageRef.current.click()}
          >
         
            < IoMdPhotos className="w-7 h-7" color='#15E882' />
            <input
                                                className="hidden"
                                                type="file"
                                                onChange={handleFileChange}
                                            />
          
            <p className="pl-2 font-bold text-gray-400   text-[14px]">Photo/Video</p>
          </div>

          <div className="flex items-center">
        
            <AiOutlineSmile className="w-7 h-7" color='#F5DC05'/>
          
            <p className="pl-2  font-bold text-gray-400 text-[14px]">Feeling/Activity</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default CreatePost