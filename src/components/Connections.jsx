import { useEffect } from "react";
import { BASE_URL } from "../utils/constant"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";
import UserCard from "./UserCard";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const getFetchConnections = async() => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true
      });
      console.log(res.data.data);
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
        <UserCard user={connection} key={connection._id}/>
      ))}
    </div>
  )
}

export default Connections;
