
import { NavLink } from "react-router-dom"
import '../styles/Navigation.css';

const Navigation = () => {
    // return  (
    //         <nav>
    //           <ul>
    //           <li><NavLink to="/" activeClassName="active">Login</NavLink></li>
    //            <li><NavLink to="/home" activeClassName="active">Home</NavLink></li>
    //           </ul>
    //         </nav>
    //       );

    return (
      <nav className="navigation">
        <ul className="nav-list">
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to="/home" className={({ isActive }) => (isActive ? "active" : "")}>
              Home
            </NavLink>
          </li>
        </ul>
      </nav>
    );
}

export default Navigation;
