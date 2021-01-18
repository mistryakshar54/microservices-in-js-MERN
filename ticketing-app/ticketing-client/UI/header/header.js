import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Link from 'next/link'

export default ({currentUser}) => {
    const getNavOptions = () => {
      if( currentUser ){
        return [
          <Link href="/"><a className="nav-link">Hi {currentUser.email}</a></Link>,
          <Link href="/auth/signout"><a className="nav-link">SignOut</a></Link>
        ]
      }
      else{
        return [
          <Link href="/auth/signin"><a className="nav-link">SignIn</a></Link>,
          <Link href="/auth/signup"><a className="nav-link">SignUp</a></Link>
        ]
      }
    }
    return(<Navbar bg="dark" variant="dark">
    <Link href="/"><Navbar.Brand>Get Tix</Navbar.Brand></Link>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        { getNavOptions() }
      </Nav>
    </Navbar.Collapse>
  </Navbar>);
}