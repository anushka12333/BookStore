import React,{Component} from 'react';
import {connect} from 'react-redux'
import {deleteBook} from '../services/index'
import {Card,Table,Image,Button,ButtonGroup,InputGroup,FormControl} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList,faEdit,faTrash,faStepBackward,faFastBackward,faStepForward, faFastForward,faSearch,faTimes} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import {Link} from 'react-router-dom'
import MyToast from "./MyToast";
import './Style.css'
class BookList extends Component{
    constructor(props){
        super(props);
            this.state={
                books : [],
                search:'',
                currentPage:1,
                booksPerPage:5,
                sortToggle:true
            };
        
    }
 sortData =() =>{
    this.setState(state =>({
        sortToggle : !state.sortToggle
    }))
    this.getAllBooks(this.state.currentPage)
 }
    componentDidMount(){
       this.getAllBooks(this.state.currentPage);
    }
    getAllBooks(currentPage){
        currentPage -= 1;
        let sortDir = this.state.sortToggle ? "asc" : "desc";
        axios.get("http://localhost:8082/books?pageNumber="+currentPage+"&pageSize="+this.state.booksPerPage+"&sortBy=price&sortDir="+sortDir)
         .then((response) => response.data)
        .then((data) => {           
            this.setState({
                books:data.content,
                totalPages:data.totalPages,
                totalElements:data.totalElements,
                currentPage:data.number + 1
            });
        });
    }
    // getAllBooks(currentPage){
    //     currentPage -= 1;
    //     let sortDir = this.state.sortToggle ? "asc" : "desc";
    //     fetch("http://localhost:8082/books?pageNumber="+currentPage+"&pageSize="+this.state.booksPerPage+"&sortBy=price&sortDir="+sortDir)
    //     .then(response => response.json())
    //     .then((data) => {           
    //         this.setState({
    //             books:data.content,
    //             totalPages:data.totalPages,
    //             totalElements:data.totalElements,
    //             currentPage:data.number + 1
    //         });
    //     });
    // }
    deleteBook =(bookId) =>{
        this.props.deleteBook(bookId);
        setTimeout(() => {
            if(this.props.bookObject != null){
                this.setState({"show":true}); 
                setTimeout(() => this.setState({"show":false}),3000)
                this.getAllBooks(this.state.currentPage)
            }
            else{
                this.setState({"show":false});
            }
        }, 1000);


        // axios.delete("http://localhost:8082/books/"+bookId)
        // .then(response => {
        //     if(response.data != null){
        //         this.setState({"show":true}); 
        //         setTimeout(() => this.setState({"show":false}),3000)
        //         this.setState({
        //             books:this.state.books.filter(book => book.id !== bookId)
        //         });
        //     }
        //     else{
        //         this.setState({"show":false});
        //     }
        // })
    }
   /* deleteBook =(bookId) =>{
        fetch("http://localhost:8082/books/"+bookId,{
            method: "DELETE"
        }).then(response => response.json())
        .then((book) => {
            if(book){
                this.setState({"show":true}); 
                setTimeout(() => this.setState({"show":false}),3000)
                this.setState({
                    books:this.state.books.filter(book => book.id !== bookId)
                });
            }
            else{
                this.setState({"show":false});
            }
        })
    }*/
    changePage = event => {
        let targetPage = parseInt(event.target.value);
        this.getAllBooks(targetPage);
        this.setState({
            [event.target.name]:targetPage
        });
     };
    firstPage =()=> {
        let firstPage=1
        if(this.state.currentPage >firstPage){
            if (this.state.search) {
                this.searchData(firstPage);
            } else {
                this.getAllBooks(firstPage);
            }
           
        }

     }
     prevPage = () =>{
        let prevPage=1
        if(this.state.currentPage >prevPage){
            if (this.state.search) {
                this.searchData(this.state.currentPage - prevPage);
            } else {
                this.getAllBooks(this.state.currentPage - prevPage);
            }
           
         }
     }
     lastPage = () =>{
        let condition=Math.ceil(this.state.totalElements /this.state.booksPerPage)
        if(this.state.currentPage < condition){
            if (this.state.search) {
                this.searchData(condition);
            } else {
                this.getAllBooks(condition);
            }
           
            
         }
     }
     nextPage = () =>{
        if(this.state.currentPage < Math.ceil(this.state.totalElements /this.state.booksPerPage)){
            if (this.state.search) {
                this.searchData(this.state.currentPage + 1);
            } else {
                this.getAllBooks(this.state.currentPage + 1);
            }
           
           
         }
     }

     searchChange = event =>{
        this.setState({
            [event.target.name]:event.target.value
        })
     }
     cancelSearch = ()=>{
        this.setState({"search":''});
        this.getAllBooks(this.state.currentPage);;
     }
     searchData = (currentPage) =>{
        currentPage -= 1;
      
        fetch("http://localhost:8082/books/search/"+this.state.search+"?page="+currentPage+"&size="+this.state.booksPerPage)
        .then(response => response.json())
        .then((data) => {           
            this.setState({
                books:data.content,
                totalPages:data.totalPages,
                totalElements:data.totalElements,
                currentPage:data.number + 1
            });
        });
     }
render(){
    const {books,currentPage,totalPages,search}=this.state;   
   
    return (
        <div>
             <div style={{"display" : this.state.show ? "block" : "none"}}>
                <MyToast show ={this.state.show}  message={"Book Deleted Successfully."} type={"danger"} />
            </div>
            <Card className={"border border-dark bg-dark text-white mt-4"}>
       <Card.Header>
            <div style={{"float":"left"}}>
            <FontAwesomeIcon icon={faList} /> Book List
            </div>
            <div style={{"float":"right"}}>
                <InputGroup size="sm">
                    <FormControl placeholder='Search' name="search" value={search} className={"bg-dark text-white info-border"} onChange={this.searchChange}/>
                    <Button size="sm" variant='outline-info' type="button" id="button-addon1" onClick={this.searchData}>
                    <FontAwesomeIcon icon={faSearch} />
                    </Button>
                    <Button size="sm" variant='outline-danger' type="button" id="button-addon2" onClick={this.cancelSearch}>
                    <FontAwesomeIcon icon={faTimes} />
                    </Button>
                </InputGroup>
            </div>
     
       </Card.Header>
<Card.Body>
<Table striped bordered hover variant='dark'>
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>ISBN Number</th>
          <th onClick={this.sortData}>Price <div className={this.state.sortToggle ? "arrow arrow-down" : "arrow arrow-up"}></div></th>
          <th>Language</th>
          <th>Genre</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
            {books.length === 0 ? 
                <tr align="center">
                <td colSpan={6}>{this.state.books.length} Books available.</td>
                </tr> :
                books.map((book) =>(
                    <tr key={book.id}>                     
                        <td>
                        <Image  src={book.coverPhotoUrl} roundedCircle width="25" height="25"/> {book.title}</td>
                        <td>{book.author}</td>
                        <td>{book.isbnNumber}</td>
                        <td>{book.price}</td>
                        <td>{book.language}</td> 
                        <td>{book.genre}</td>
                        <td>
                            <ButtonGroup>
                            <Link to={"edit/"+book.id} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit} /></Link>{' '}
                                
                                <Button size='sm' variant='outline-danger' onClick={this.deleteBook.bind(this,book.id)}><FontAwesomeIcon icon={faTrash} /> </Button>
                            </ButtonGroup>
                        </td>
                    </tr>

                ))       
      }
             </tbody>
        </Table>
        </Card.Body>
        {books.length > 0 ?
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
             </Card.Footer> : null
             }
       </Card>
        </div>
    
    )
}

}

const mapStateToProps =(state) =>{
    return {
       bookObject:state.book,
      
    };
   };
   const mapDispatchToProps = dispatch =>{
   return{
       deleteBook: (bookId) => dispatch(deleteBook(bookId)),
       
   };
   };

export default connect(mapStateToProps,mapDispatchToProps)(BookList);

