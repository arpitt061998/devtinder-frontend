import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { BASE_URL } from '../utils/constant';

const Signup = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [about, setAbout] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async() => {
    try {
      const res = await axios.post(`${BASE_URL}/signup`, 
        {
          emailId,
          password,
          firstName,
          lastName,
          age,
          gender,
          photoUrl,
          about
        },
        {withCredentials: true});
      navigate("/login")
    } catch(err) {
      setError(true);
      console.error(err)
    }
  };

  return (
    <div className='my-5 flex items-center justify-center'>
        <div className="card w-96 border-2">
            <div className="card-body">
                <div className="card-title flex justify-center">Sign Up </div>
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
                    type="password"
                    className="input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                <legend className="fieldset-legend">FirstName</legend>
                <input 
                    type="text"
                    className="input"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">LastName</legend>
                <input 
                    type="text"
                    className="input"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Age</legend>
                <input
                  type="text"
                  className="input"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Gender</legend>
                <input 
                  type="text"
                  className="input"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">PhotoUrl</legend>
                <input 
                  type="text"
                  className="input"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">About</legend>
                <input 
                  type="text"
                  className="input"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </fieldset>
                {error && (<p className='text-red-400'>Error Signing in</p>)}
                <div className="card-actions justify-center">
                <button 
                  className="btn"
                  onClick={handleSignup}
                >
                  Sign up
                </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Signup;