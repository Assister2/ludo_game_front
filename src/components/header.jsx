import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Header({ loggedIn, user }) {
  const [navExpanded, setNavExpanded] =  useState(false);


  return (
    <Navbar expand="lg" bg="light" expanded={navExpanded} onToggle={() => setNavExpanded(!navExpanded)}>
      <Navbar.Brand to="/" as={Link}>
        Welcome
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav onSelect={() => {
          setNavExpanded(!navExpanded)
          }} className="mr-auto" >
          <Nav.Link as={Link} to="/" onClick={() => setNavExpanded(false)}>
            Play
          </Nav.Link>
          {loggedIn && (
            <>
              <Nav.Link as={Link} to="/history" onClick={() => setNavExpanded(false)}>
                History
              </Nav.Link>
              <Nav.Link as={Link} to="/setting" onClick={() => setNavExpanded(false)}>
                Setting
              </Nav.Link>
              <Nav.Link as={Link} to="/buy" onClick={() => setNavExpanded(false)}>
                Buy Chips
              </Nav.Link>
              <Nav.Link as={Link} to="/sell" onClick={() => setNavExpanded(false)}>
                Sell Chips
              </Nav.Link>
              <Nav.Link as={Link} to="/refer" onClick={() => setNavExpanded(false)}>
                Refer & Earn
              </Nav.Link>
            </>
          )}
          <Nav.Link as={Link} to="/help" onClick={() => setNavExpanded(false)}>
            Help
          </Nav.Link>
          <Nav.Link as={Link} to="/term" onClick={() => setNavExpanded(false)}>
            Term & Condition
          </Nav.Link>
          {loggedIn ? (
            <Nav.Link as={Link} to="/logout" onClick={() => setNavExpanded(false)}>
              Logout
            </Nav.Link>
          ) : (
            <>
              <Nav.Link as={Link} to="/login" onClick={() => setNavExpanded(false)}>
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/register" onClick={() => setNavExpanded(false)}>
                Register
              </Nav.Link>
            </>
          )}
        </Nav>
        {loggedIn && (<span className="navbar-text">Chips: {user.wallet}</span>)}
      </Navbar.Collapse>
    </Navbar>
  );
}
