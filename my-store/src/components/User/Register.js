import React,{Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock,faUndo,faUserPlus,faPhone,faUser } from '@fortawesome/free-solid-svg-icons';
import { Button, Card, Form, InputGroup,Row,Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import {registerUser} from '../../services/index';
import MyToast from "../MyToast";
import {useNavigate} from 'react-router-dom';

function withParams(Component) {
    return props => <Component {...props}  navigate={useNavigate()}/>;
  }
class Register extends Component{
    constructor(props){
        super(props);
        this.state=this.initialState;
        this.state.show= false;
        this.state.message=''
    }
    initialState ={
        email:'',password:'',phonenumber:'',name:''
    }
    credentialChange = event =>{
        this.setState({
            [event.target.name]:event.target.value
        });
      };
      registerUser =() =>{
        let userObject={
            name:this.state.name,
            email:this.state.email,
            password:this.state.password,
            mobile:this.state.phonenumber
        }
        this.props.registerUser(userObject);
        this.resetRegisterForm();
        setTimeout(() => {
            if(this.props.user.message != null){
                if(this.props.user.message != null){
                    this.setState({show :true,"method":"post"})
                    setTimeout(() => {
                       this.setState({show:false});
                       this.props.navigate("/login")

                    }, 3000);
                }

            }
            else{
                this.setState({show:false});
            }
        }, 2000);
      }
      resetRegisterForm = () => {
        this.setState(() => this.initialState);
      };
    render(){
        const{email,password,phonenumber,name}=this.state;
        return (
            <div>           
                <div>
                <div style={{"display" : this.state.show ? "block" : "none"}}>
                <MyToast show={this.state.show } message="Registered Successfully." type={"success"} />
            </div>
                </div>
          <Row className="justify-content-md-center mt-4">
          <Col xs={5}>
          <Card className='border border-dark bg-dark text-white'>
            <Card.Header>
            <FontAwesomeIcon icon={faUserPlus} /> Register
            </Card.Header>
            <Card.Body>
                <Row>
                    <Form.Group as={Col}>
                        <InputGroup>
                        <InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon={faUser} /></InputGroup.Text>
                            <Form.Control
                            reuired                            
                            autoComplete='off'
                            type="text"
                            name="name"
                            value={name}
                            onChange={this.credentialChange}
                            placeholder="Enter Your Name"
                           className={"bg-dark text-white"}
                            aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                    </Form.Group>
                </Row>                
                <Row>
                <Form.Group as={Col}>
                        <InputGroup>
                        <InputGroup.Text id="basic-addon1" className={"mt-4"}><FontAwesomeIcon icon={faEnvelope} /></InputGroup.Text>
                            <Form.Control
                            reuired                            
                            autoComplete='off'
                            type="email"
                            name="email"
                            value={email}
                            onChange={this.credentialChange}
                            placeholder="Enter Your Email Address"
                           className={"bg-dark text-white  mt-4"}
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
                <Row>
                    <Form.Group as={Col}>
                        <InputGroup>
                        <InputGroup.Text id="basic-addon1" className={"mt-4"}><FontAwesomeIcon icon={faPhone} /></InputGroup.Text>
                            <Form.Control
                            reuired                
                            autoComplete='off'
                            type="number"
                            name="phonenumber"
                            value={phonenumber}
                            onChange={this.credentialChange}
                            placeholder="Enter Your Phone Number"
                           className={"bg-dark text-white mt-4"}
                            aria-describedby="basic-addon2"
                            />
                        </InputGroup>
                    </Form.Group>
                </Row>
            </Card.Body>
            <Card.Footer style={{"text-align" :"right"}}>
                <Button onClick={this.registerUser} size="sm" type='button' variant='success' disabled={this.state.email.length=== 0 || this.state.password.length===0}>
                    <FontAwesomeIcon icon={faUserPlus} /> Register
                </Button>{' '}
                <Button onClick={this.resetRegisterForm} size="sm" type='info' disabled={this.state.email.length=== 0 ||this.state.password.length===0}>
                    <FontAwesomeIcon icon={faUndo} />Reset
                </Button>
            </Card.Footer>
          </Card>

          </Col>

          </Row>
          </div>
        );
    }
}
const mapStateProps = state =>{
    return {
      
        user:state.user
    }
  }
  const mapDispatchProps = dispatch =>{
    return{
      registerUser: (userObject) => dispatch(registerUser(userObject))
    }
  }
  export default connect(mapStateProps,mapDispatchProps)(withParams(Register));