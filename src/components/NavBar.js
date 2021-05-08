import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Button,
  Badge
} from 'reactstrap';
import { signInUser, signOutUser } from '../helpers/auth';

const NavBar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const authenticated = () => (
    <>
      <NavItem>
        <Link className="nav-link" to="/players">Members</Link>
      </NavItem>
      <NavItem>
        <Link className="nav-link mr-3" to="/add-player">Add Member</Link>
      </NavItem>
    </>
  );

  return (
    <div>
      <Navbar color="light" light expand="md">
        <Link className="navbar-brand" to="/">
          <h4><Badge color="secondary">Noted</Badge></h4></Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            { user && authenticated() }
            {
              user !== null
              && <NavItem>
                {
                  user
                    ? <Button className="sign-in-out-button" outline size="sm" color='danger' onClick={signOutUser}>Sign Out</Button>
                    : <Button className="sign-in-out-button" outline size="sm" color='info' onClick={signInUser}>Sign In</Button>
                }
              </NavItem>
            }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

NavBar.propTypes = {
  user: PropTypes.any
};

export default NavBar;
