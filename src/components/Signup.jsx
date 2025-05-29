import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
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
<div className="min-h-screen flex items-center justify-center bg-pink-300 py-12 px-4">
  <div className="card max-w-md w-full border border-gray-300 shadow-lg bg-neutral-800">
    <div className="card-body space-y-5">
      <h2 className="card-title justify-center text-2xl font-semibold text-white">Sign Up</h2>

      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-white">Email</legend>
        <input 
          type="email"
          className="input input-bordered w-full"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
        />
      </fieldset>

      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-white">Password</legend>
        <input 
          type="password"
          className="input input-bordered w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </fieldset>

      <div className="grid grid-cols-2 gap-4">
        <fieldset className="space-y-2">
          <legend className="text-sm font-medium text-white">First Name</legend>
          <input 
            type="text"
            className="input input-bordered w-full"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </fieldset>

        <fieldset className="space-y-2">
          <legend className="text-sm font-medium text-white">Last Name</legend>
          <input 
            type="text"
            className="input input-bordered w-full"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </fieldset>
      </div>

      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-white">Age</legend>
        <input 
          type="number"
          className="input input-bordered w-full"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </fieldset>

      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-white">Gender</legend>
        <input 
          type="text"
          className="input input-bordered w-full"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />
      </fieldset>

      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-white">Photo URL</legend>
        <input 
          type="text"
          className="input input-bordered w-full"
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
        />
      </fieldset>

      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-white">About</legend>
        <textarea 
          className="textarea textarea-bordered w-full"
          rows={3}
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />
      </fieldset>

      {error && <p className="text-red-500 text-sm text-center">Error signing in</p>}
      <p className='text-white'>Have an account <Link className = "underline"to = "/login">Login</Link> now</p>
      <div className="card-actions justify-center">
        <button 
          className="btn btn-secondary w-full"
          onClick={handleSignup}
        >
          Sign Up
        </button>
      </div>
    </div>
  </div>
</div>

  )
}

export default Signup;
