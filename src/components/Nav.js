import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";

export default function Nav({ user }) {
  console.log(user.userName, user.role);
  const location = useLocation();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.setItem("validuser", false);
    navigate('/');
  }
  const isValidUser = localStorage.getItem("validuser") === "true";

  return isValidUser ? (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <span className="h3 bold">PushNote</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className={`${location.pathname === '/dashboard' ? 'active bold-underline' : ''} nav-item`}>
              <Link to="/" className={`${location.pathname === '/dashboard' ? 'orange-font' : ''} nav-link`} >
                <span className="h5">Dashboard</span>
              </Link>
            </li>
            {user.role === "manager" && (
              <li className={`${location.pathname === '/manage' ? 'active bold-underline' : ''} nav-item`}>
                <Link to="/manage" className={`${location.pathname === '/manage' ? 'orange-font' : ''} nav-link`}>
                  <span className="h5">Employees</span>
                </Link>
              </li>
            )}
            <li className={`${location.pathname === '/chat' ? 'active bold-underline' : ''} nav-item`}>
              <Link to="/chat" className={`${location.pathname === '/chat' ? 'orange-font' : ''} nav-link`}>
                <span className="h5">chat</span>
              </Link>
            </li>
          </ul>

        </div>
        <Button onClick={logout} label="Logout" severity="secondary" raised />
      </div>
    </nav>
  ) : <></>;
}

/*
<li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Profile
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>


<form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
*/