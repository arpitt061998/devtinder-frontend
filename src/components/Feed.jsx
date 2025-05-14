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
      const res = await axios.get(`${BASE_URL}/feed`, {
        withCredentials: true
      });
      console.log(res.data[0])
      dispatch(addFeed(res.data));
    } catch(err) {
      console.log(err);
    };
  };

  useEffect(() => {
    if(!feed){
      getFeed();
    }
  },[])


  return feed?.length > 0 ? (
    
    <div className="flex justify-center my-4 items-center flex-col">
      {feed.map(user => (
        <UserCard user={user} key={user._id}/>
      ))}
    </div>
  ) : null;
}


export default Feed;
