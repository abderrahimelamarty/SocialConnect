// import { observer } from "mobx-react-lite";


const HeaderProfile = () => {
  

  return (
    <>
      <img
        // onClick={signOut}
        className="rounded-full cursor-pointer w-10 h-10"
    src="https://www.themarysue.com/wp-content/uploads/2022/09/levi-.jpeg"
       
       
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