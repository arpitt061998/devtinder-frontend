import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { Link, useNavigate } from 'react-router';
import { BASE_URL } from '../utils/constant';

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [errorMsg, setErrorMsg] = useState("Error logging in");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    // Simple regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    setError(false);
    setEmailError("");

    if (!isValidEmail(emailId)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data?.data));
      navigate("/");
    } catch (err) {
      if(err.status === 404){
        setErrorMsg("Email does not exist");
      }
      if(err.status === 401) {
        setErrorMsg("Invalid Password");
      }
      setError(true);
      console.error(err);
    }
  };

  return (
    <div className='flex items-center justify-center bg-pink-300 min-h-[88vh]'>
      <div className="card w-96 border-2 my-5 bg-neutral-800">
        <div className="card-body">
          <div className="card-title flex justify-center">Login</div>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email Id</legend>
            <input 
              type="text"
              className="input"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </fieldset>
          {emailError && <p className='text-red-400'>{emailError}</p>}

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input 
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>

          {error && <p className='text-red-400'>{errorMsg}</p>}

          <p className='text-white'>
            New to DevTinder? <Link className="underline" to="/signup">Sign up</Link> now
          </p>

          <div className="card-actions justify-center">
            <button 
              className="btn btn-secondary"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
