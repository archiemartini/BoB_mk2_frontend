import { Link, useMatch, useResolvedPath } from "react-router-dom"
import KitchenIcon from '@mui/icons-material/Kitchen';

export default function Navbar() {

  return (
    <nav className="nav">
    
      <Link to="/" className="site-title"><KitchenIcon /><span className="site-title">FridgeIt</span></Link>
      <ul>
        <CustomLink to="/login">Login</CustomLink>
        {/* <CustomLink to="/logout">Logout</CustomLink> */}
        <CustomLink to="/signup">Sign Up</CustomLink>          
      </ul>
    </nav>
  )
}

function CustomLink({to, children, ...props}) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true})
  
  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to}>{children}</Link>
    </li>
  )
}