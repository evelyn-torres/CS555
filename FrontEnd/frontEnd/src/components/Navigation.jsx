import react from "@vitejs/plugin-react-swc"

import react from "react"
import { NavLink } from "react-router-dom"

const Navigation = () => {
    return  (
        <nav>
            <ul>
            <li>
                    <NavLink to="/login">Login</NavLink>
                </li>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                
                <li>
                    <NavLink to="/register">Register</NavLink>
                </li>
            </ul>
        </nav>
    )
}
