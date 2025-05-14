import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router';
import { BASE_URL } from '../utils/constant';

const Login = () => {
  const [emailId, setEmailId] = useState("anushka@gmail.com");
  const [password, setPassword] = useState("anushka123");
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async() => {
    try {
      const res = await axios.post(`${BASE_URL}/login`, {
        emailId,
        password  
      },{withCredentials: true});
      dispatch(addUser(res.data?.data));
      navigate("/")
    } catch(err) {
      setError(true);
      console.error(err)
    }
  };

  return (
    <div className='my-5 flex items-center justify-center'>
        <div className="card w-96 border-2">
            <div className="card-body">
                <div className="card-title flex justify-center">Login </div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Email Id</legend>
                  <input 
                      type="text"
                      className="input"
                      value={emailId}
                      onChange={(e) => setEmailId(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Password</legend>
                  <input 
                    type="text"
                    className="input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </fieldset>
                {error && (<p className='text-red-400'>Error logging in</p>)}
                <div className="card-actions justify-center">
                <button 
                  className="btn"
                  onClick={handleLogin}
                >
                  Login
                </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login;