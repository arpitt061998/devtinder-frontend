import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeRequests } from "../utils/requestsSlice";
import { Link } from "react-router";

const RequestCard = ( {user, requestId , isRequestCard = false, isChatAvailable = false }) => {
  const {firstName, lastName, photoUrl, about, gender, age} = user;
  const dispatch = useDispatch();

  const reviewRequest = async(status, requestId) => {
    try{
      const res = await axios.post(`${BASE_URL}/request/review/${status}/${requestId}`,{},{
        withCredentials: true
      });
      dispatch(removeRequests(requestId));
    } catch(err) {
      console.error("error accepting/rejecting request")
    }
  }

  return (
    <div className="card bg-neutral-800 w-96 shadow-sm mb-4">
      <figure>
        <img
          src={photoUrl}
          alt={firstName} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>{about}</p>
        <p>{age}, {gender}</p>
        {isRequestCard && (<div className="card-actions justify-center my-4">
          <button className="btn btn-secondary" onClick={() => reviewRequest("rejected",requestId)}>Reject</button>
          <button className="btn btn-pink" onClick={() => reviewRequest("accepted",requestId)}>Accept</button>
        </div>)}
        {isChatAvailable && (<div className="card-actions justify-center my-4">
          <Link to = {`/chat/${requestId}`}>
            <button className="btn btn-secondary">Chat</button>
          </Link>
        </div>)}
      </div>
    </div>
  )
}

export default RequestCard;
