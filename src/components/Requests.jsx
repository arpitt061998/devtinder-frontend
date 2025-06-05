import axios from 'axios'
import { BASE_URL } from '../utils/constant'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests } from '../utils/requestsSlice'
import RequestCard from './RequestCard'
const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector(store => store.requests);
  const [reviewRequest, setReviewRequest] = useState(false);
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

  if(requests === null) return;
  if(requests.length === 0) return (
    <div className="flex justify-center items-center bg-pink-300 min-h-[88vh] text-white text-3xl">No Pending Requests ... </div>
  )
  return (
    <div className='flex flex-col items-center justify-center bg-pink-300 min-h-[85vh]'>
      <div className='my-5'>
      {requests.map((user) =>  {
        if(user) {
          return <RequestCard user = {user.fromUserId} requestId = {user._id} key={user._id} isRequestCard = {true}/>
        }
        return null;
      })}
      </div>
    </div>
  )
}

export default Requests;
