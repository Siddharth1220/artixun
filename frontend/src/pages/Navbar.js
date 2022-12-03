import { Outlet, Link } from "react-router-dom";

const Navbar = () => {
  const Auth = localStorage.getItem("authenticated");

  if (Auth === "false")
  {

    return (
      <>
      <nav className="navbar navbar-expand-sm bg-primary">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-link text-light">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/Login" className="nav-link text-light">Login</Link>
          </li>
          <li className="nav-item">
            <Link to="/Signup" className="nav-link text-light">signup</Link>
          </li>
        </ul>
      </nav>
      

      <Outlet />
    </>
  )
}

else
{
  return (
    <>
    <nav className="navbar navbar-expand-sm bg-primary">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link text-light">Home</Link>
        </li>
        <li className="nav-item">
        <button type="button" className="btn btn-danger" onClick={logout}>Logout</button>
        </li>
      </ul>
    </nav>

    <Outlet />
  </>
)
}

};
const logout = (event) =>{
  localStorage.setItem("authenticated", false);
}


export default Navbar;