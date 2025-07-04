import { useEffect } from "react";
import { BASE_URL } from "../utils/constant"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";
import RequestCard from "./RequestCard";
import { Link } from "react-router";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const getFetchConnections = async() => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true
      });
      console.log(res.data.data)
      dispatch(addConnections(res.data.data));
    } catch(err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getFetchConnections();
  },[])

  if(!connections) return;
  if(connections.length === 0) return (
    <div className="flex justify-center items-center bg-pink-300 min-h-[88vh] text-white text-3xl">Zero connections. <Link to = "/" className="underline mx-1">Add</Link> one? </div>
  )
  return (
    <div className="flex justify-center items-center bg-pink-300 flex-col min-h-[88vh]">
      <div className="user-listing mt-5">
      {connections.map((connection) => {
        if (connection) {
          return (
            <RequestCard
              key={connection._id}
              user={connection}
              requestId={connection._id}
              isRequestCard={false}
              isChatAvailable={true}
            />
          );
        }
        return null;
      })}
      </div>
    </div>
  )
}

export default Connections;
