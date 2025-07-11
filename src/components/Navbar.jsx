import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constant";
import { removeUser } from "../utils/userSlice";
import { removeAllFeed } from "../utils/feedSlice";
import { removeAllRequests } from "../utils/requestsSlice";
import { removeConnections } from "../utils/connectionsSlice";

const Navbar = () => {
  const {user} = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async() => {
    try {
      const res = await axios.post(`${BASE_URL}/logout`,
        {},
        {withCredentials: true}
      )
      dispatch(removeUser());
      dispatch(removeAllFeed());
      dispatch(removeAllRequests());
      dispatch(removeConnections());
      setTimeout(() => navigate("/login"), 50);
    } catch(err) {
      console.err("Logout failed...")
    }
  }

  return (
    <div className="navbar bg-base-100 shadow-sm z-10">
        <div className="flex-1">
            <Link to= "/" className="btn btn-ghost text-xl">🧑‍💻 DevTinder</Link>
        </div>
        {user && (
          <>
            <div>Welcome, {user?.firstName}</div>
            <div className="flex gap-2 ">
                <div className="dropdown dropdown-end mx-5">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                    <img
                        alt={user?.firstName}
                        src= {user?.photoUrl} />
                    </div>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                    <li>
                      <Link to = "/profile" className="justify-between">
                        Edit Profile
                      </Link>
                    </li>
                    <li>
                      <Link to = "/connections" className="justify-between">
                        Connections
                      </Link>
                    </li>
                    <li>
                      <Link to = "/requests" className="justify-between">
                        Requests
                      </Link>
                    </li>
                    <li><a onClick={handleLogout}>Logout</a></li>
                </ul>
                </div>
            </div>
          </>
        )}
    </div>
  )
}

export default Navbar;
