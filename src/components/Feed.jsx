import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { useEffect, useState } from "react";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector(store => store.feed);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const getFeed = async (pageNumber = 1) => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/user/feed?page=${pageNumber}`, {
        withCredentials: true
      });
      const newData = res.data.data;
      if (newData.length < 10) {
        setHasMore(false);
      }
      dispatch(addFeed(pageNumber === 1 ? newData : [...feed, ...newData]));
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!feed) {
      getFeed();
    }
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        if (!loading && hasMore) {
          setPage(prevPage => prevPage + 1);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [feed, loading, hasMore]);

  useEffect(() => {
    if (page > 1 && hasMore) {
      getFeed(page);
    }
  }, [page, hasMore]);

  if (!feed) return;
  if (feed.length === 0) return (
    <div className="flex text-white justify-center items-center bg-pink-300 min-h-[88vh] text-3xl">No new user are available... </div>
  )
  return (
    <div className="flex justify-center items-center flex-col bg-pink-300 min-h-[88vh]">
      <div className="my-4">
        {feed.map(user => (
          <UserCard user={user} key={user._id}/>
        ))}
      </div>
      {loading && <div className="text-white text-center mt-4">Loading...</div>}
    </div>
  );
}

export default Feed;
