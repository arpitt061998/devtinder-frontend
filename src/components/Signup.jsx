import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { BASE_URL } from '../utils/constant';

const Signup = () => {
  const [formData, setFormData] = useState({
    emailId: "",
    password: "",
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    photoUrl: "",
    about: ""
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("Error signing up. Please try again.")
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!formData.emailId) newErrors.emailId = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.emailId)) newErrors.emailId = "Email format is invalid.";

    if (!formData.password) newErrors.password = "Password is required.";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters.";

    if (!formData.firstName) newErrors.firstName = "First name is required.";
    if (!formData.lastName) newErrors.lastName = "Last name is required.";

    if (!formData.age) newErrors.age = "Age is required.";
    else if (parseInt(formData.age) <= 0) newErrors.age = "Age must be a positive number.";

    if (!formData.gender) newErrors.gender = "Gender is required.";

    return newErrors;
  };

  const handleSignup = async () => {
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      await axios.post(`${BASE_URL}/signup`, formData, {
        withCredentials: true,
      });
      navigate("/login");
    } catch (err) {
      if(err.status === 400 && err.response.data.error === "Duplicate email error") {
        setErrorMsg(err.response.data.message);
      }
      setApiError(true);
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-300 py-12 px-4">
      <div className="card max-w-md w-full border border-gray-300 shadow-lg bg-neutral-800">
        <div className="card-body space-y-5">
          <h2 className="card-title justify-center text-2xl font-semibold text-white">Sign Up</h2>

          {[
            { label: "Email", name: "emailId", type: "email" },
            { label: "Password", name: "password", type: "password" },
            { label: "First Name", name: "firstName", type: "text" },
            { label: "Last Name", name: "lastName", type: "text" },
            { label: "Age", name: "age", type: "number" },
            { label: "Photo URL", name: "photoUrl", type: "text" },
          ].map(({ label, name, type }) => (
            <fieldset className="space-y-2" key={name}>
              <legend className="text-sm font-medium text-white">{label}</legend>
              <input
                name={name}
                type={type}
                className="input input-bordered w-full"
                value={formData[name]}
                onChange={handleChange}
              />
              {errors[name] && <p className="text-red-400 text-xs">{errors[name]}</p>}
            </fieldset>
          ))}

          <fieldset className="space-y-2">
            <legend className="text-sm font-medium text-white">Gender</legend>
            <select
              name="gender"
              className="select select-accent w-full"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            {errors.gender && <p className="text-red-400 text-xs">{errors.gender}</p>}
          </fieldset>

          <fieldset className="space-y-2">
            <legend className="text-sm font-medium text-white">About</legend>
            <textarea
              name="about"
              className="textarea textarea-bordered w-full"
              rows={3}
              value={formData.about}
              onChange={handleChange}
            />
          </fieldset>

          {apiError && (
            <p className="text-red-500 text-sm text-center">{errorMsg}</p>
          )}

          <p className="text-white">
            Have an account? <Link className="underline" to="/login">Login</Link> now
          </p>

          <div className="card-actions justify-center">
            <button className="btn btn-secondary w-full" onClick={handleSignup}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
