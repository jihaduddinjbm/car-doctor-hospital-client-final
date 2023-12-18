import { Link } from "react-router-dom";

import logo from '../../../assets/logo.svg';
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider/AuthProvider";
const NavBar = () => {

    const {user, logOut} = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
        .then(() => {})
        .catch(error => console.log(error))
    }

    const navItems = <>
        <li><Link to='/'> Home</Link></li>
        <li><Link to='/about'>About</Link></li>
        {user?.email ? <>
            <li><Link to='/booking'>My Booking </Link></li>
        <li><button onClick={handleLogOut}>log  out </button></li> 
        </>
        : <li><Link to='/login'>login</Link></li>
        }
    
    </>
    return (
        <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
       {navItems}
      </ul>
    </div>
    <Link className="btn btn-ghost text-xl">
        <img src={logo} alt="" />
    </Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {navItems}
    </ul>
  </div>
  <div className="navbar-end">
  <button className="btn btn-warning" >Appointed</button>
  </div>
</div>
    );
};

export default NavBar;