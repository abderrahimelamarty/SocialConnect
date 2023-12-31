import { useDispatch, useSelector } from "react-redux";
// import { debounce } from "../utilities/debounce";
// import { UserDetails } from "./UserDetails";
// import { searchUser } from "../features/user/userSlice";
import { useEffect } from "react";
import { useAppSelector } from "../../store/hooks";
import { selectAuth } from "../../features/authSlice";
import { UserDetails } from "../UserDetails/UserDetails";
import { User } from "../../types";

export const AsideRight = () => {

  const {user}=useAppSelector(selectAuth)

    const dispatch = useDispatch();
    const users: User[] = [
      {
        id:1,
        token: "abc123",
        email: "john@example.com",
        name: "John Doe",
      },
      {id:1,
        token: "xyz456",
        email: "jane@example.com",
        name: "Jane Smith",
      },
      {id:1,
        token: "123qwe",
        email: "bob@example.com",
        name: "Bob Johnson",
      },
    ];

    // const suggestionList = users.filter(
    //     suggestedUser => suggestedUser.username !== userData.username &&
    //         !suggestedUser.followers.find(existingUser => existingUser.username === userData.username)
    // )

    // useEffect(() => {
    //     dispatch(searchUser(""));
    // }, [dispatch]);

    return (
        <aside className="w-full basis-2/6 flex-col ml-7 hidden lg:flex md:mt-2">

            <div className="sticky mt-3 flex items-center pl-4 pr-10 w-full rounded-md">
                <div className="flex-1">
                    <input
                        // onChange={debounce(e => dispatch(searchUser(e.target.value)), 1000)}
                        className="w-full bg-slate-200 text-center p-2 rounded-3xl placeholder:text-black cursor-pointer text-md"
                        type="search"
                        placeholder="Search"
                    />
                </div>
            </div>

            <div className="mt-2 ">

                {/* {searchQuery.trim() !== "" ? (

                    <div>

                        {searchResults?.length === 0 && (
                            <h2 className="text-lg w-full text-center font-semi-bold">No user found</h2>
                        )}

                        {searchResults.map(user => (
                            <UserDetails key={user._id} currentUser={user} />
                        ))}
                    </div>
                ) : (!searchQuery.length && ( */}
                    <div>
                        <h1 className="text-xl mt-6 text-center font-bold">Suggestions for you</h1>
                        <ul className="">
                            {users.map(user => (
                                <UserDetails key={user.name} {...user} />
                            ))}
                        </ul>
                    </div>
                {/* ))} */}
            </div>
        </aside>
    )
};