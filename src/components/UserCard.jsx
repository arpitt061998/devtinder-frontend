import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ( {user} ) => {

  const dispatch = useDispatch();
  const handleRequest = async(status, _id) => {
    try {
      const res = await axios.post(`${BASE_URL}/request/send/${status}/${_id}`,{},{
        withCredentials: true
      });
      dispatch(removeFeed(_id));
      console.log(res);
    } catch(err) {
      console.log(err);
    }
  };

  const {firstName, lastName, photoUrl, about, gender, age, _id} = user;
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
        <p>{age}</p>
        <p>{gender}</p>
        <div className="card-actions justify-center my-4">
          <button className="btn btn-secondary" onClick={() => handleRequest("ignored",_id)}>Ignore</button>
          <button className="btn btn-pink" onClick={() => handleRequest("interested",_id)}>Interested</button>
        </div>
      </div>
    </div>
  )
}

export default UserCard;
