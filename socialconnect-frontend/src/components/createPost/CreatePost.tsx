import React from 'react'
import { AiFillVideoCamera, AiOutlineSmile } from 'react-icons/ai'
import { BsFillEmojiSmileFill } from 'react-icons/bs'
import { GrGallery } from 'react-icons/gr'
import {IoMdPhotos} from'react-icons/io'
function CreatePost() {
  return (
    <div>
         <div className="w-screen sm:w-full ">
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
              placeholder="What's on your mind Joe Doe?"
              className="outline-0 bg-[#f2f3f7] p-1 rounded-full pl-3 w-full h-12 truncate"
            //   ref={captionRef}
            />
          </div>

          <div
            className="flex items-center bg-blue-500 px-3 rounded-full h-10 ml-4"
            // onClick={uploadPost}
          >
            <button className="font-bold text-white">
              {/* {loading ? "Loading" : "Post"} */}
              Post
            </button>
          </div>
        </div>

        {/* <div className="">
          {image ? (
            <div className="" onClick={() => setImage("")}>
              <img src={image} className="p-4" alt="" />
            </div>
          ) : (
            ""
          )}
        </div> */}

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
                type="file"
                className="hidden"
                // ref={imageRef}
                // onChange={addImageToState}
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