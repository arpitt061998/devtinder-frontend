import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';
import { addUser, setAuthStatus } from '../utils/userSlice';
import { useLocation } from 'react-router';

const ProtectedRoute = ({children}) => {
  const {user, authStatus} = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      dispatch(setAuthStatus("checking"));
      try {
        const res = await axios.get(`${BASE_URL}/profile/view`, {
          withCredentials: true,
        });
        const userData = res.data?.data;
        if (userData) {
          dispatch(addUser(userData));
        } else {
          dispatch(setAuthStatus("unauthenticated"));
        }
      } catch (err) {
        dispatch(setAuthStatus("unauthenticated"));
        console.error('User fetch failed:', err);
      } finally {
        setLoading(false);
      }
    };

    if (!user && authStatus === "idle") {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [user, dispatch]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
