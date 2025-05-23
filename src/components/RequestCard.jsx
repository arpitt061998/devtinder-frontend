import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeRequests } from "../utils/requestsSlice";

const RequestCard = ( {user, requestId , isRequestCard = false }) => {
  const {firstName, lastName, photoUrl, about, gender, age} = user;
  const dispatch = useDispatch();

  const reviewRequest = async(status, userId) => {
    try{
      const res = await axios.post(`${BASE_URL}/request/review/${status}/${userId}`,{},{
        withCredentials: true
      });
      dispatch(removeRequests(userId));
      console.log(res);
    } catch(err) {
      console.error("error accepting/rejecting request")
    }
  }

  return (
    <div className="card bg-base-100 w-96 shadow-sm mb-4">
      <figure>
        <img
          src={photoUrl}
          alt={firstName} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>{about}</p>
        <p>{age}</p>
        <p>{gender}</p>
        {isRequestCard && (<div className="card-actions justify-center my-4">
          <button className="btn btn-secondary" onClick={() => reviewRequest("rejected",requestId)}>Reject</button>
          <button className="btn btn-pink" onClick={() => reviewRequest("accepted",requestId)}>Accept</button>
        </div>)}
      </div>
    </div>
  )
}

export default RequestCard;
