import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from "reactstrap";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar className="navbar navbar-expand-lg sticky-top navbar-dark bg-dark">
      <NavbarBrand href="/">
        HR
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="me-auto" navbar>
          <NavItem>
            <NavLink className="nav-link" to="/skills">
              Skills
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav-link" to="/candidate/create">
              Create candidate
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav-link" to="/candidate/show">
              Show candidate
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav-link" to="/candidate/filter">
              Filter candidate
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav-link" to="/skills/create">
              Create skills
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
}
