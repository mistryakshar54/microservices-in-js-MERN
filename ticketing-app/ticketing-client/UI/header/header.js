import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Link from 'next/link'

export default () => {
    return(<Navbar bg="dark" variant="dark">
    <Link href="/"><Navbar.Brand>Get Tix</Navbar.Brand></Link>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Link href="/auth/signin"><a className="nav-link">SignIn</a></Link>
        <Link href="/auth/signup"><a className="nav-link">SignUp</a></Link>
        <Link href="/"><a className="nav-link">SignOut</a></Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>);
}