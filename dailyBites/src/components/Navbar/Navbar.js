import './Navbar.css';
import { Link, useMatch, useResolvedPath } from "react-router-dom";

const Navbar = (props) => {
    return (
        <nav className="nav">
            <Link to="/" className="site-title">
                Daily Bites
            </Link>
                <ul>
                    <CustomLink to="/">Home</CustomLink>
                    <CustomLink to="/log">Log</CustomLink>
                </ul>
                <ul>
                    <CustomLink to="/account">My Account</CustomLink>
                </ul>
                <ul>
                    <CustomLink onClick={props.logout} to="/login">Logout</CustomLink>
                </ul>
        </nav>
    )
  }

  const CustomLink = ({to, children, ...props}) => {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch( {path: resolvedPath.pathname, end: true})

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
  }

  export default Navbar