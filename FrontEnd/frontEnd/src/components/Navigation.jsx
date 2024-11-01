import { NavLink } from "react-router-dom";
import '../styles/Navigation.css';

const Navigation = () => {
    const isAuthenticated = localStorage.getItem('authenticated') === 'true';

    return (
      <nav className="navigation">
        <ul className="nav-list">
          {!isAuthenticated && (
            <li>
              <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
                Login
              </NavLink>
            </li>
          )}
          {isAuthenticated && (
            <li>
              <NavLink to="/home" className={({ isActive }) => (isActive ? "active" : "")}>
                Home
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    );
}

export default Navigation;
