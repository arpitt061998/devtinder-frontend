import { useEffect } from "react";
import { BASE_URL } from "../utils/constant"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";
import RequestCard from "./RequestCard";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const getFetchConnections = async() => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true
      });
      console.log(res.data.data[0])
      dispatch(addConnections(res.data.data));
    } catch(err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getFetchConnections();
  },[])

  if(!connections) return;
  if(connections.length === 0) return <h1>No connections found...</h1>
  return (
    <div className="flex justify-center items-center my-10 flex-col">
      {connections.map(connection => (
        <RequestCard key={connection._id} user={connection} requestId = {connection._id} isRequestCard={false} isChatAvailable={true}/>
      ))}
    </div>
  )
}

export default Connections;
