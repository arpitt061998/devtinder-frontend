import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { useEffect } from "react";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector(store => store.feed);
  const dispatch = useDispatch();
  const getFeed = async() => {
    try {
      const res = await axios.get(`${BASE_URL}/user/feed`, {
        withCredentials: true
      });
      console.log(res.data.data[0])
      dispatch(addFeed(res.data.data));
    } catch(err) {
      console.log(err);
    };
  };

  useEffect(() => {
    if(!feed){
      getFeed();
    }
  },[])

  if(!feed) return;
  if(feed.length === 0) return (
    <div className="flex text-white justify-center items-center bg-pink-300 min-h-[88vh] text-3xl">No new user are available... </div>
  )
  return (
    <div className="flex justify-center items-center flex-col bg-pink-300 min-h-[88vh]">
      <div className="my-4">
        {feed.map(user => (
          <UserCard user={user} key={user._id}/>
        ))}
      </div>
    </div>
  );
}


export default Feed;
