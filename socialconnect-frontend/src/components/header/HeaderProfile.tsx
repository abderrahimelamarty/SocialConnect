// import { observer } from "mobx-react-lite";


const HeaderProfile = () => {
  

  return (
    <>
      <img
        // onClick={signOut}
        className="rounded-full cursor-pointer"
    src="https://wallpapercrafter.com/desktop1/505594-anime-anime-boys-Jujutsu-Kaisen-Satoru-Gojo-4K.jpg"
        width={40}
        height={40}
       
        alt="avatar"
      />
      <p
        className="hidden lg:inline-flex text-sm whitespace-nowrap 
        font-semibold pr-3"
      >
        {/* {user?.displayName} */}
        abderrahim
      </p>
    </>
  );
};

// export default observer(HeaderProfile);
export default  HeaderProfile;