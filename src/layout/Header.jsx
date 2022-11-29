import { useLocation } from 'react-router-dom';

import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  console.log({ location });

  return (
    <Navbar expand='lg' bg='dark' variant='dark'>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto'>
          <Nav.Link as={Link} to='/' active={location.pathname === '/'}>
            Search
          </Nav.Link>
          <Nav.Link
            as={Link}
            to='/favorites'
            active={location.pathname === '/favorites'}
          >
            Favorites
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
