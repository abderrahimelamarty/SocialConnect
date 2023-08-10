import React, { useRef, useState } from 'react'
import { AiFillVideoCamera, AiOutlineSmile } from 'react-icons/ai'
import { BsFillEmojiSmileFill } from 'react-icons/bs'
import { GrGallery } from 'react-icons/gr'
import {IoMdClose, IoMdPhotos} from'react-icons/io'
import { createPost } from '../../features/posts/postSlice'
import { useAppDispatch } from '../../store/hooks'
import { uploadImageToCloudinary } from '../../helpers/ImageUpload'
import { storage } from '../../config/firebase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
function CreatePost() {
  const [showFilterPostModal, setShowFilterModal] = useState(false);

  const [sortPostBy, setSortPostBy] = useState("Latest");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [text, settext] = useState("");

  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  

const dispatch=useAppDispatch()


const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
   setLoading(true)
  if (file) {
    
    const storageRef = ref(storage, `files/${file.name}`);
    const   uploadTask = uploadBytesResumable(storageRef, file);
     uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(progress);
       
      },
      (error) => {
        alert(error);
      },
     async () => {
      await   getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL)
          setImage(downloadURL)
         setLoading(false)
        });
      }
    );
  }
};

  const postHandler = async (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    const userId:number=1;
    if (image) {
       

       
            dispatch(createPost({userId,text,image}));
            setLoading(false);

        
        
    } else {
        dispatch(createPost({userId,text,image}));
    }
    settext("");
    setImage("");
}
const handleDelete=()=>{
  setImage("");
 
  
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
              value={text}
              placeholder="What's on your mind Joe Doe?"
              className="outline-0 bg-[#f2f3f7] p-1 rounded-full pl-3 w-full h-12 truncate"
          
              onChange={(e) => settext(e.target.value)}
            />
          </div>

          <div
            className="flex items-center bg-blue-500 px-3 rounded-full h-10 ml-4"
         
          >
            <button className="font-bold text-white"  onClick={postHandler}>
              {loading ? "Loading ..." : "Post"}
              
            </button>
          </div>
        </div>

        <div className=" relative">
          {image ? (
            <div className="  w-full h-50" onClick={() => setImage("")}>
              <img src={image} className="p-4" alt="" />
              <button
                    className="absolute top-4 right-4 mt-2 mr-2 bg-red-500 text-white p-1 rounded-full"
                    onClick={() => setImage('')}
                >
                    <IoMdClose size={16} />
                </button>
            </div>
          ) : (
            ""
          )}
            {
        loading &&
        
        
          
  <div className="w-80 mx-20 md:mx-10 sm:mx-10 bg-gray-200 rounded-full dark:bg-gray-700">
    <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: `${progress}%` }} > {progress}%</div>


        </div>
        
      }
        </div>

        <div
          className="
        border-b mb-4 mt-2"
        ></div>
        <div className="flex justify-between px-3 sm:mx-9 pb-3">
          <div className="flex items-center hover:bg-slate-100  rounded-3xl">
           
           < AiFillVideoCamera className="w-6 h-6" color='red'/>
            
            <p className="pl-2   font-bold text-gray-400 whitespace-nowrap text-[14px]">Live Video</p>
          </div>

          <div
            className="flex items-center"
            // onClick={() => imageRef.current.click()}
          >
            <label className='flex items-center hover:bg-slate-100   rounded-3xl'>
         
            < IoMdPhotos className="w-6 h-6" color='#15E882' />
            <input
                                                className="hidden "
                                                type="file"
                                                onChange={handleImageUpload}
                                            />
                                            
          
            <p className="pl-2 font-bold text-gray-400   text-[14px]">Photo/Video</p>
            </label>
          </div>

          <div className="flex items-center hover:bg-slate-100  rounded-3xl">
        
            <AiOutlineSmile className="w-6 h-6" color='#F5DC05'/>
          
            <p className="pl-2  font-bold text-gray-400 text-[14px]">Feeling/Activity</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default CreatePost