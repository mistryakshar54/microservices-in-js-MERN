import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Link from 'next/link'

export default ({currentUser}) => {
    const getNavOptions = () => {
      if( currentUser ){
        return [
          <Link href="/"><a className="nav-link">Hi {currentUser.email}</a></Link>,
          <Link href="/tickets/new"><a className="nav-link">Create Ticket</a></Link>,
          <Link href="/orders/list"><a className="nav-link">View Orders</a></Link>,
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
    return(<Navbar bg="light" variant="light">
    <Navbar.Brand><Link href="/">Get Tix</Link></Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav>
        { getNavOptions() }
      </Nav>
    </Navbar.Collapse>
  </Navbar>);
}