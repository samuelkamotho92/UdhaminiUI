import { useContext } from 'react'
import { FaHome, FaPencilAlt, FaSignInAlt, FaUser } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { Context } from '../context/Context';
function Header() {
  const { user, dispatch } = useContext(Context);
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    window.location.replace("/")
  }
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-none">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-40">
            <li><Link className='my-0' to="/"><FaHome />Home</Link></li>
            <li><Link to="/about"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              About</Link></li>
            <li><Link to="/register"><FaPencilAlt /> Register</Link></li>
            <li><Link to="/login"><FaSignInAlt /> Login</Link></li>
            {
              user && (
                <li>
                  <div className="dropdown dropdown-center">
                    <label tabIndex={0} className="avatar">
                      <FaUser className="w-10 rounded-full text-xl" />
                    </label>

                    <ul tabIndex={0} className="mt-10 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-30">
                      <li><Link to={`/profile/${user?._id}`} className="justify-between">Profile</Link></li>
                      <li><Link to={`/profile/update/${user?._id}`}>Settings</Link></li>
                      <li><a href='#' onClick={handleLogout}>Logout</a></li>
                    </ul>
                  </div>
                </li>
              )
            }
          </ul>
        </div>
      </div>
      <div className="">
        <Link className=" normal-case text-xl  xs:text-center xs:text-3xl xs:justify-self-center" to="/">💰 Ũdhamini App</Link>
      </div>
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link className='my-0' to="/"><FaHome />Home</Link></li>
          <li><Link to="/about"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            About</Link></li>
          <li><Link to="/register"><FaPencilAlt /> Register</Link></li>
          <li><Link to="/login"><FaSignInAlt /> Login</Link></li>
          {
            user && (
              <li>
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="avatar">
                    <FaUser className="w-10 rounded-full text-xl" />
                  </label>

                  <ul tabIndex={0} className="mt-10 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-30">
                    <li><Link to={`/profile/${user?._id}`} className="justify-between">Profile</Link></li>
                    <li><Link to={`/profile/update/${user?._id}`}>Settings</Link></li>
                    <li><a href='#' onClick={handleLogout}>Logout</a></li>
                  </ul>
                </div>
              </li>
            )
          }
        </ul>
      </div>
    </div>

  )
}

export default Header