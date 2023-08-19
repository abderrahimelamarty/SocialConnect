import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsFillImageFill } from "react-icons/bs";


import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectAuth } from '../../features/authSlice';
import { closePostModal, createPost, selectPost } from '../../features/posts/postSlice';
import { Post } from '../../types';
import { AiFillVideoCamera, AiOutlineSmile } from 'react-icons/ai';
import { IoMdClose, IoMdPhotos } from 'react-icons/io';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../config/firebase';


export const CreatePostModal = () => {

       const [postData, setPostData] = useState<Post |null >();
        const [progress, setProgress] = useState<number>(0);
  
       const [text,setText]=useState("")
       const [isFetching, setIsFetching] = useState(false);
       const [loading, setLoading] = useState(false);
       const [image, setImage] = useState("");
   const {user}=useAppSelector(selectAuth)
  const {showPostModal,editPostObj} =useAppSelector(selectPost)

    const dispatch = useAppDispatch();

    useEffect(() => {
        setPostData(editPostObj);
       if(postData){
        setImage(postData?.image)
       }

        return () => {
            setPostData(null);
        };
    }, [editPostObj]);
  
    useEffect(() => {
        if(postData?.image) {
            if (isFetching) {
                if (editPostObj) {
                    console.log("Editing Post");
                } else {
                    console.log("Adding Post");            
                    }
            }
        } else {
            if (isFetching) {
                if (editPostObj) {
                    console.log("Editing Post");
                } else {
                    console.log("Adding Post");
                }
            }
        }
    }, [isFetching]);
   
   

    const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (postData) {
          setPostData({
            ...postData,
            text: e.target.value, // Make sure this matches your property name
          });
        }
      };
      const handleImageDelete= (e: React.MouseEvent<HTMLButtonElement>) => {
        if (postData) {
          setPostData({
            ...postData,
            image: '', // Make sure this matches your property name
          });
        }
      };
    const cloudinaryUrl = "https://api.cloudinary.com/v1_1/dytvl1fnk/image/upload";
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
    // const postHandler = async (e) => {
    //     e.preventDefault();
    //     setIsFetching(true);
    //     if (postData) {
    //         if (
    //             postData?.image !== editPostObj?.image ||
    //             postData?.text !== editPostObj?.text
    //         ) {
    //             if (typeof postData?.image === "object") {
    //                 const file = postData?.image;
    //                 const formData = new FormData();
    //                 formData.append("file", file);
    //                 formData.append("upload_preset", "alcon-social");
    //                 formData.append("folder", "alcon");

    //                 try {
    //                     const res = await fetch(cloudinaryUrl, {
    //                         method: "POST",
    //                         body: formData,
    //                     });

    //                     const { url } = await res.json();

    //                     if (editPostObj) {
    //                         dispatch(editPost({ postData: { ...postData, image: url }, post: editPostObj }));
    //                         setIsFetching(false);
    //                     } else {
    //                         dispatch(createPost({ postData: { ...postData, image: url } }));
    //                         setIsFetching(false);
    //                     }

    //                 } catch (err) {
    //                     console.error("error occured", err);
    //                 }

    //             } else {
    //                 if (editPostObj) {
    //                     dispatch(editPost({ postData: postData, token, post: editPostObj }));
    //                     setIsFetching(false);
    //                 } else {
    //                     dispatch(createPost({ postData: postData, token }));
    //                     setIsFetching(false);
    //                 }
    //             }
    //         }
    //     }
    //     setPostData({ text: "", image: "" });
    //     dispatch(closePostModal());
    //     dispatch(setEditPostObj(null));
    // }

    return (


    <>
      {showPostModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
  <div className="relative w-auto my-6 mx-auto max-w-3xl">              {/*content*/}
  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-2 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold">
                    Edit post
                  </h3>
                </div>
              <div>
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
              value={postData?.text}
              placeholder="What's on your mind Joe Doe?"
              className="outline-0 bg-[#f2f3f7] p-1 rounded-full pl-3 w-full h-12 truncate"
              onChange={ handleContentChange}
            />
          </div>

          
        </div>

        <div className=" relative">
          {postData?.image ? (
            <div className="  w-full h-50" >
              <img src={postData.image} className="p-4" alt="" />
              <button
                    className="absolute top-4 right-4 mt-2 mr-2 bg-red-500 text-white p-1 rounded-full"
                    onClick={handleImageDelete}
                >
                    <IoMdClose size={16} />
                </button>
            </div>
          ) : (
            ""
          )}
            {/* {
        loading &&
        
        
          
  <div className=" mx-auto bg-white rounded-full dark:bg-white">
    <div className="bg-blue-600 text-xs font-medium text-white text-center p-0.5 leading-none rounded-full" style={{ width: `${progress}%` }} > {progress}%</div>


        </div>
        
      } */}
        </div>

        <div
          className="
        border-b mb-4 mt-2"
        ></div>
        <div className="flex justify-between gap-5  px-3 sm:mx-9 pb-3">
          <div className="flex items-center hover:bg-slate-100   rounded-3xl">
           
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
                                                // onChange={handleImageUpload}
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
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => dispatch(closePostModal())}
                  >
                    Close
                  </button>
                  <button
                    className="bg-blue-800 text-white active:bg-emerald-600 font-bold uppercase text-sm px-2 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => dispatch(closePostModal())}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
       
