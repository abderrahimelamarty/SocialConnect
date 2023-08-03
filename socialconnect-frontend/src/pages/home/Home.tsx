import React from 'react'
import { Leftside } from '../../components/LeftSide/Leftside'
import { MobileNavBar } from '../../components/mobile/MobileNavBar'
import { GiSettingsKnobs } from "react-icons/gi";
import { BsFillImageFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { BiSolidMap } from 'react-icons/bi';
export default function Home() {
  return (
    <div className='bg-gray-100'>
      <MobileNavBar/>
    <div className="flex justify-center px-5 sm:px-32 md:mt-4">
    <div className="flex h-screen w-screen">
      <Leftside/>
      <main className="md:mx-4 w-full sm:basis-2/3">

                        

                        <header className="text-xl font-bold flex py-4 text-blue-600 sm:hidden">
                            <Link to="/home" id="hero-logo"> SOCIALCONNECT </Link>
                        </header>

                        {/* create post */}

                        <>
                            <div className="border sm:ml-3 sm:mr-0  bg-white flex px-2 py-3 rounded-3xl mt-5">

                                <div className="mt-3 w-12 h-12 text-lg flex-none">
                                    <img src="https://img.freepik.com/premium-vector/young-man-anime-style-character-vector-illustration-design-manga-anime-boy_147933-2539.jpg" className="flex-none w-12 h-12 rounded-full" alt="avatar" />
                                </div>

                                <div className="w-full px-4">
                                    <input
                                      type='text'
                                        placeholder="What's happening?"
                                        className="resize-none mt-3 mb-2 pb-3 w-full h-10 bg-slate-100 focus:outline-none rounded-xl p-2"
                                         >
                                    </input>
                                    <div className="max-w-xl max-h-80 mx-auto rounded-md">
                                        <img
                                            // src={postImageUrl ? URL.createObjectURL(postImageUrl) : ""}
                                            // className={postImageUrl ? "block max-w-full max-h-20 rounded-md my-2 cursor-pointer" : "hidden"}
                                            // alt="avatar"
                                        />
                                    </div>

                                    <div className="flex justify-between">
                                        <label className="flex m-2  flex-row justify-center items-center gap-1">
                                            <input
                                                className="hidden"
                                                type="file"
                                                // onChange={(e) => setPostImageUrl(e.target.files[0])}
                                            />
                                              
                                            <BsFillImageFill className="text-2xl mt-1 text-blue-700 cursor-pointer" />
                                            Photo/Videos
                                        </label>
                                        
                                        <button
                                          
                                            className="w-20 p-2.5 bg-blue-600 hover:bg-blue-800 text-white rounded-xl shadow-md hover:shadow-lg transition duration-150 ease-in-out disabled:cursor-not-allowed"
                                            >
                                            Post
                                        </button>
                                    </div>
                                </div>
                            </div>


                            {/* filter posts by date and trending */}

                            <div className="flex pl-0.5 pr-0.5 sm:pr-6 sm:px-5 py-3 justify-between relative">

                                {/* <h1 className="text-xl">{sortPostBy} Posts</h1> */}

                                {/* <GiSettingsKnobs
                                    className="fill-blue-600 stroke-0 hover:stroke-2 text-2xl cursor-pointer"
                                    onClick={() => setShowFilterModal(prev => !prev)}>
                                </GiSettingsKnobs> */}

                                {/* filter modal */}

                                {/* {showFilterPostModal && <div className="w-30 h-22 px-1 shadow-xl bg-slate-100 border border-slate-300 text-slate-600 font-semibold absolute right-11 top-4 z-20 rounded-xl">
                                    <ul className="p-2 cursor-pointer text-start">
                                        <li className="p-1 hover:bg-slate-200 rounded" onClick={() => { setSortPostBy("Latest"); setShowFilterModal(false); }}>Latest</li>
                                        <li className="p-1 hover:bg-slate-200 rounded" onClick={() => { setSortPostBy("Oldest"); setShowFilterModal(false); }}>Oldest</li>
                                        <li className="p-1 hover:bg-slate-200 rounded" onClick={() => { setSortPostBy("Trending"); setShowFilterModal(false); }}>Trending</li>
                                    </ul>
                                </div>
                                } */}
                            </div>

                            {/* Show Posts

                            {isLoading ? (
                                <div className="z-20">
                                    <Loader show={isLoading} />
                                </div>
                            ) : (
                                !sortedPosts.length ?
                                    <h1 className="text-2xl font-bold text-center mt-8">No Posts, Add one!</h1> :
                                    sortedPosts?.map(post => <Post key={post._id} post={post} />
                                    )
                            )} */}

                        </>

                    </main>

      </div>
      </div>
      </div>
  )
}
