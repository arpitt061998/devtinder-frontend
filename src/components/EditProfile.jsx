import axios from "axios";
import { use, useState } from "react"
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({user}) => {

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async() => {
    try {
      const res = await axios.patch(`
        ${BASE_URL}/profile/edit`, 
        {
          firstName,
          lastName,
          age,
          gender,
          photoUrl,
          about
        },
        {
          withCredentials: true
        },
      )
      dispatch(addUser(res.data.user));
      setShowToast(true);
      setTimeout(()=> {
        setShowToast(false)
      },2000);   
      setError(false);
    } catch(err) {
      console.log(err);
      setError(true);
    }
  }

  return (
    <>
    <div className='bg-pink-300 flex items-center justify-center min-h-[88vh]'>
      <div className="card w-96  shadow bg-neutral-800">
        <div className="card-body">
            <div className="card-title flex justify-center">Edit Profile </div>
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
              <select class="select select-accent" value={gender} onChange={(e) => setGender(e.target.value)}>
                <option>Male</option>
                <option>Female</option>
              </select>
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
            {error && (<div className="error text-red-400">Error updating the Profile</div>)}
            <div className="card-actions justify-center">
            <button 
              className="btn btn-secondary"
              onClick={saveProfile}
            >
              Save Profile
            </button>
            </div>
        </div>
      </div>
    </div>
    {showToast && (
      <div className="toast toast-middle toast-center">
        <div className="alert alert-success">
          <span>Profile Updated successfully.</span>
        </div>
      </div>
    )}
  </>
  )
}

export default EditProfile;
