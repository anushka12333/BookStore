import React from 'react';
import './Welcome.css'
import { Row} from 'react-bootstrap';

export default function Welcome (){
        return(
            <Row  className='welcome-body'>
          <div className='col-md-6 offset-md-3 container' >
          <div className="welcome " >

            <h1>Welcome to our Book Store.</h1>
            <p>We keep every types of books here !!</p>
            
            <footer className='blockquote-footer'>
            Mark Twin
            </footer>
           
          </div>

          </div>
            </Row>

        );
    
}
