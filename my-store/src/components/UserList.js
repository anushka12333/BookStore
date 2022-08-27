import React,{Component} from 'react'
import {Card,Table,Button,InputGroup,FormControl, Alert} from 'react-bootstrap';
import {connect} from 'react-redux';
import {fetchUsers} from '../services/index'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUsers,faStepBackward,faFastBackward,faStepForward, faFastForward} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './Style.css'

 class UserList extends Component{
    constructor(props){
        super(props);
            this.state={
                users : [],
                currentPage:1,
                userPerPage:5
            };
        
    }
    componentDidMount(){
        // this.getAllRandomUsers();
        this.props.fetchUsers();
     }
    //  getAllRandomUsers(){
    //      axios.get("https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole")
    //      .then(response => response.data)        
    //      .then((data) => {           
    //          this.setState({users:data});       
             
    //      });  
    //     //  console.log(users);
       
    //  }
     changePage = event => {
        this.setState({
            [event.target.name]:parseInt(event.target.value)
        });
     };
     firstPage =()=> {
        if(this.state.currentPage >1){
           this.setState({
            currentPage:1
           })
        }

     }
     prevPage = () =>{
        if(this.state.currentPage >1){
            this.setState({
             currentPage: this.state.currentPage -1
            })
         }
     }
     lastPage = () =>{
        let usersLength = this.props.userData.users.length;
        if(this.state.currentPage < Math.ceil( usersLength /this.state.userPerPage)){
            this.setState({
             currentPage: Math.ceil( usersLength /this.state.userPerPage)
            })
         }
     }
     nextPage = () =>{
        let usersLength = this.props.userData.users.length;
        if(this.state.currentPage < Math.ceil(usersLength /this.state.userPerPage)){
            this.setState({
             currentPage:this.state.currentPage + 1
            })
         }
     }



    render(){
        const {currentPage,userPerPage}=this.state;
        const lastIndex= currentPage * userPerPage;
        const userData = this.props.userData;
        const users = userData.users
        const firstIndex = lastIndex - userPerPage;
        const currentUsers = users.slice(firstIndex , lastIndex);
        const totalPages= users.length / userPerPage;

    
        return (
            <div>
            {userData.error ? 
            <Alert variant='danger'>
                {userData.error}
            </Alert> :
       
            <Card className={"border border-dark bg-dark text-white mt-4"}>
            <Card.Header><FontAwesomeIcon icon={faUsers} /> Book List</Card.Header>
            <Card.Body>
            <Table striped bordered hover variant='dark'>
            <thead>
             <tr>
                <td>Name</td>
                <td>Email</td>
                <td>Address</td>
                <td>Created</td>
                <td>Balance</td>
             </tr>
             </thead>
             <tbody>
                {users.length === 0 ? 
                <tr align="center">
                    <td colSpan="6">No Users Available</td>
                </tr> :
                currentUsers.map((user,index) =>(
                    <tr key={index}>
                        <td>{user.first}</td>
                        <td>{user.email}</td>
                        <td>{user.address}</td>
                        <td>{user.created}</td>
                        <td>{user.balance}</td>
                    </tr>
                ))}
             </tbody>
             </Table>
             </Card.Body>
             {users.length > 0 ?
             <Card.Footer>
                <div style={{"float":"left"}}>
                    Showing Page {currentPage} of {totalPages}
                </div>
                <div style={{"float":"right"}}>
                <InputGroup className="mb-3" className='prepend' size="sm">
                <Button  type="button" variant="outline-info" id="button-addon1" onClick={this.firstPage}><FontAwesomeIcon icon={faFastBackward} /> First</Button>
                <Button variant="outline-info" id="button-addon1" disabled={currentPage === 1 ? true : false} onClick={this.prevPage}><FontAwesomeIcon icon={faStepBackward} /> Prev
                </Button>
                 <FormControl  className={"page-num bg-dark"}  name="currentPage" value={currentPage} onChange={this.changePage}/>
                 <Button variant="outline-info" id="button-addon2" disabled={currentPage === totalPages ? true : false} onClick={this.nextPage}><FontAwesomeIcon icon={faStepForward} /> Next
                  </Button>
                  <Button variant="outline-info" id="button-addon2" disabled={currentPage === totalPages ? true :false} onClick={this.lastPage}><FontAwesomeIcon icon={faFastForward} /> Last
                   </Button>
                    </InputGroup>
                </div>
             </Card.Footer> : null}
             </Card>}
             </div>
        );
    }
}

const mapStateToProps = state =>{
 return {
    userData:state.user
 }
};
const mapDispatchToProps = dispatch =>{
return{
    fetchUsers: () => dispatch(fetchUsers())
}
};
export default connect(mapStateToProps,mapDispatchToProps)(UserList);
