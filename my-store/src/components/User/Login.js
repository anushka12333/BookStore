import React,{Component} from 'react';
import {useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faSignInAlt,faUndo } from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';
import {aunthenticateUser} from '../../services/index';
import { Button, Card, Form, InputGroup,Row,Col,Alert} from 'react-bootstrap';

function withParams(Component) {
    return props => <Component {...props} navigate={useNavigate()}/>;
  }
class Login extends Component{
    constructor(props){
        super(props);
        this.state=this.initialState;
    }
    initialState ={
        email:'',password:'',error:''
    }
    credentialChange = event =>{
        this.setState({
            [event.target.name]:event.target.value
        });
      };
     validateUser =() =>{
       this.props.aunthenticateUser(this.state.email,this.state.password);
       setTimeout(()=>{
        if(this.props.auth.isLoggedIn){
        return this.props.navigate("/");         
        }
        else{
          this.resetLoginForm();
          this.setState({"error":"Invalid email and password"})
        }
       },500)
      
    }
      resetLoginForm = () => {
        this.setState(() => this.initialState);
      };
    render(){
        const{email,password,error}=this.state;
        return (
          <Row className="justify-content-md-center mt-4">
          <Col xs={5}>
          {error && <Alert variant="danger">{error}</Alert>}
          <Card className='border border-dark bg-dark text-white'>
            <Card.Header>
                <FontAwesomeIcon icon={faSignInAlt} />Login
            </Card.Header>
            <Card.Body>
                <Row>
                    <Form.Group as={Col}>
                        <InputGroup>
                        <InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon={faEnvelope} /></InputGroup.Text>
                            <Form.Control
                            reuired                            
                            autoComplete='off'
                            type="email"
                            name="email"
                            value={email}
                            onChange={this.credentialChange}
                            placeholder="Enter Your Email Address"
                           className={"bg-dark text-white"}
                            aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col}>
                        <InputGroup>
                        <InputGroup.Text id="basic-addon1" className={"mt-4"}><FontAwesomeIcon icon={faLock} /></InputGroup.Text>
                            <Form.Control
                            reuired                
                            autoComplete='off'
                            type="text"
                            name="password"
                            value={password}
                            onChange={this.credentialChange}
                            placeholder="Enter Password"
                           className={"bg-dark text-white mt-4"}
                            aria-describedby="basic-addon2"
                            />
                        </InputGroup>
                    </Form.Group>
                </Row>
            </Card.Body>
            <Card.Footer style={{"text-align" :"right"}}>
                <Button  size="sm" type='button' variant='success' disabled={this.state.email.length=== 0 || this.state.password.length===0} onClick={this.validateUser}>
                    <FontAwesomeIcon icon={faSignInAlt} />Login
                </Button>{' '}
                <Button onClick={this.resetLoginForm} size="sm" type='info' disabled={this.state.email.length=== 0 &&this.state.password.length===0 && this.state.error.length===0}>
                    <FontAwesomeIcon icon={faUndo} />Reset
                </Button>
            </Card.Footer>
          </Card>

          </Col>

          </Row>
        );
    }
}

const mapStateProps = state =>{
    return {
      
        auth:state.auth
    }
  }
  const mapDispatchProps = dispatch =>{
    return{
      aunthenticateUser: (email,password) => dispatch(aunthenticateUser(email,password))
    }
  }
  export default connect(mapStateProps,mapDispatchProps)(withParams(Login));