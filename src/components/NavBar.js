import { Button, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { NavLink, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';

const NavBar = () => {
  const history = useHistory();

  const goPage = (page) => {
    history.replace(page);
  };

  const [profile, setProfile] = useState();

  useEffect(() => {
    const profileValue = JSON.parse(localStorage.getItem('profile'));
    if (profileValue) {
      setProfile(profileValue);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('profile');
    history.go(0);
    history.replace('/');
  };

  return (
    <Navbar bg="success" expand="lg" variant="dark">
      <NavLink className="navbar-brand" to="/" exact>
        <img
          src="./logo192.png"
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
        />{' '}
        CodingThailand
      </NavLink>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavLink
            className="nav-link"
            to="/product"
            exact
            activeClassName="active"
          >
            สินค้า
          </NavLink>
          <NavLink
            className="nav-link"
            to="/about"
            exact
            activeClassName="active"
          >
            เกี่ยวกับ
          </NavLink>
          <NavDropdown title="Workshop" id="basic-nav-dropdown">
            <NavDropdown.Item onClick={() => goPage('/hospital')}>
              Hospital (Pagination)
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => goPage('/news')}>
              News (CRUD)
            </NavDropdown.Item>
          </NavDropdown>
          <NavLink
            className="nav-link"
            to="/upload"
            exact
            activeClassName="active"
          >
            Upload file
          </NavLink>
          <NavLink
            className="nav-link"
            to="/member"
            exact
            activeClassName="active"
          >
            Member
          </NavLink>
        </Nav>
        {/*<Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>*/}
        {profile ? (
          <span className="navbar-text text-white">
            Welcome {profile.name}&nbsp;
            <Button variant="danger" onClick={logout}>
              Logout
            </Button>
          </span>
        ) : (
          <Nav>
            <NavLink
              className="nav-link"
              to="/register"
              exact
              activeClassName="active"
            >
              Register
            </NavLink>
            <NavLink
              className="nav-link"
              to="/login"
              exact
              activeClassName="active"
            >
              Login
            </NavLink>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
