import { faSignInAlt,faUserPlus,faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react'
import {Navbar,Nav} from 'react-bootstrap';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { logoutUser } from "../services/index";
class NavBar extends Component{
  logout = () => {
    this.props.logoutUser();
  }
  render(){
    const guestLinks=(
      <>
         <Nav className="ms-auto">      
        <Link className="nav-link nav-head" to={"/register"}><FontAwesomeIcon icon={faUserPlus} /> Register</Link>
          <Link className="nav-link nav-head" to={"/login"}><FontAwesomeIcon icon={faSignInAlt} /> Login</Link>
        </Nav>
      </>
    );
    const userLinks=(
      <>          
        <Nav className="me-auto">
          <Link to={"add"} className="nav-link">Add Book</Link>
          <Link to={"list"} className="nav-link">Book List</Link>           
          <Link to={"users"} className="nav-link">User List</Link>            
        </Nav>
        <Nav className="ms-auto">
        <Link to={"logout"} onClick={this.logout} className="nav-link" ><FontAwesomeIcon icon={faSignOutAlt} /> Logout</Link>
       </Nav>
      </>
    );
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
        <Link to={""} className="navbar-brand">
        <img src="https://cdn-icons-png.flaticon.com/512/2232/2232688.png" style={{width: 33}}  alt="not found" />   Book Store
        </Link>  
        {this.props.auth.isLoggedIn ? userLinks : guestLinks}    
        </Navbar>
    );
    }
}
const mapStateToProps = state => {
  return {
    auth:state.auth
  };
}
const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => dispatch(logoutUser())
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(NavBar);