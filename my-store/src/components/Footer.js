import React from 'react';
import { Container,Navbar,Col } from 'react-bootstrap';
import './Footer.css'
class Footer extends React.Component{
    render(){
        let fullYear = new Date().getFullYear();
    return(
      <Navbar fixed="bottom" bg="dark" variant="dark">
      <Container>
        <Col lg={12} className="text-center text-muted">
        <div className='footer'> {fullYear}-{fullYear+1} All Rights Reserved by Book Shop</div>

        </Col>
      </Container>

      </Navbar>
    );
    }
}
export default Footer;