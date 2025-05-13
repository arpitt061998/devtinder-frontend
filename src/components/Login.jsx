import axios from 'axios';
import { useState } from 'react';

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async() => {
    try {
      const res = await axios.post("http://localhost:3000/login", {
        emailId,
        password  
      },{withCredentials: true});
      console.log(res.data);
    } catch(err) {
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
                      onChange={(e) => setEmailId(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Password</legend>
                  <input 
                    type="text"
                    className="input"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </fieldset>
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