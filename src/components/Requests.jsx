import axios from 'axios'
import { BASE_URL } from '../utils/constant'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests } from '../utils/requestsSlice'
import UserCard from './UserCard'
const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector(store => store.requests);
  const fetchPendingRequests = async() => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests`, {
        withCredentials: true
      })
      console.log(res.data.data);
      dispatch(addRequests(res.data.data));
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchPendingRequests();
  },[])

  if(!requests) return;
  if(requests.length === 0) <h1>No pending requests...</h1>
  return (
    <div className='flex flex-col items-center justify-center my-10'>
      {requests.map(user =>  (
        <UserCard user = {user.fromUserId} key={user._id}/>
      ))}
    </div>
  )
}

export default Requests
