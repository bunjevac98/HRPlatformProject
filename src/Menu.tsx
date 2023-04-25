import { NavLink } from "react-router-dom";

export default function Menu() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          HR
        </NavLink>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/skills">
                Skills
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/skills/create">
                Create Skills
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/candidate/create">
                Create candidate
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/candidate/:id">
                ShowCandidate
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/candidate/filter">
                Filter candidate
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
