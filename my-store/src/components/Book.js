import React,{Component} from 'react'
import {connect} from 'react-redux'
import {saveBook,fetchBook,updateBook} from '../services/index'
import {Card ,Form,Button,Col,Row} from 'react-bootstrap'
import {useNavigate, useParams } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlusSquare, faSave,faUndo,faList,faEdit} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import MyToast from "./MyToast";


function withParams(Component) {
    return props => <Component {...props} params={useParams()} navigate={useNavigate()}/>;
  }


class Book extends Component{    
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state= {
            genres : [],
            languages:[],
            show:false    
        }
        this.bookChange=this.bookChange.bind(this);
        this.SubmitBook=this.SubmitBook.bind(this);
    };
   
    initialState = {
      id:'',  title:'',author:'',coverPhotoUrl:'',isbnNumber:'',price:'',language:'',genre:''
      
    };
   
    componentDidMount(){
        let { bookId } = this.props.params;     
       
        if(bookId){
            this.findBookById(bookId);
        }
        this.findAllLanguages();
        this.findAllGeners();
    }
    findAllLanguages =()=>{
        axios.get("http://localhost:8082/books/languages")
        .then(response => response.data)
        .then((data) => {
            this.setState({
                languages: [{value:'',display:"Select language"}]
                .concat(data.map(language =>{
                    return {value:language,display:language}
                }))
            })
        })
    }
    findAllGeners = () =>{
        axios.get("http://localhost:8082/books/genres")
        .then(response => response.data)   
        .then((data) => {           
            this.setState({
               genres: [{value:'',display:"Select Genre"}] 
               .concat(data.map(genre =>{
                return {value:genre,display:genre}                
               }))
            });
        });
      
    }
 
    findBookById  = (bookId) =>{
        this.props.fetchBook(bookId);
        setTimeout(() => {
            let book = this.props.bookObject.book;
            console.log(book);
            
        if(book !==null){                      
            this.setState({
                id:book.id,
                title:book.title,
                author:book.author,
                coverPhotoUrl:book.coverPhotoUrl,
                isbnNumber:book.isbnNumber,
                price:book.price,
                language:book.language,
                genre:book.genre
            });
        }
        }, 2000);
    }

        // axios.get("http://localhost:8082/books/"+bookId)
        // .then(response => {
        //     if(response.data !==null){
        //         console.log(response.data);
                
        //         this.setState({
        //             id:response.data.id,
        //             title:response.data.title,
        //             author:response.data.author,
        //             coverPhotoUrl:response.data.coverPhotoUrl,
        //             isbnNumber:response.data.isbnNumber,
        //             price:response.data.price,
        //             language:response.data.language,
        //             genre:response.data.genre
        //         });
        //     }
            
        // }).catch((error)=>{
        //     console.log('Error '+error );
            
        // })
 
  /*  findBookById  = (bookId) =>{
        fetch("http://localhost:8082/books/"+bookId)
        .then(response =>response.json())
        .then((book) =>{
            if(book){                 
                this.setState({
                    id:book.id,
                    title:book.title,
                    author:book.author,
                    coverPhotoUrl:book.coverPhotoUrl,
                    isbnNumber:book.isbnNumber,
                    price:book.price,
                    language:book.language,
                    genre:book.genre
                });
            }
            
        }).catch((error)=>{
            console.log('Error '+error );
            
        })
    }*/
    resetBook = ()=>{
        this.setState(()=>this.initialState);
    }
    SubmitBook =event => {         
        event.preventDefault();
        const book = {
           title :this.state.title,
           author:this.state.author,
           coverPhotoUrl: this.state.coverPhotoUrl,          
           isbnNumber: this.state.isbnNumber,
            language:  this.state.language,
            price:this.state.price,
            genre:this.state.genre
            
        };
        this.props.saveBook(book);
        setTimeout(() => {
            if(this.props.savedBookObject.book != null){
                this.setState({"show":true,"method":"post"}); 
                setTimeout(() => this.setState({"show":false}),3000)               
            }
            else{
                this.setState({"show":false});
            }
        }, 2000);
    }
           
    //     axios.post("http://localhost:8082/books",book)
    //     .then(response => {
    //         if(response.data != null){
    //             this.setState({"show":true,"method":"post"}); 
    //             setTimeout(() => this.setState({"show":false}),3000)               
    //         }
    //         else{
    //             this.setState({"show":false});
    //         }
    //     });
    //     this.setState(this.initialState);
    // }
  /*  SubmitBook =event => {         
        event.preventDefault();
        const book = {
           title :this.state.title,
           author:this.state.author,
           coverPhotoUrl: this.state.coverPhotoUrl,          
           isbnNumber: this.state.isbnNumber,
            language:  this.state.language,
            price:this.state.price,
            genre:this.state.genre
            
        }
        
        const headers =  new Headers();
        headers.append("Content-Type",'application/json')

        fetch("http://localhost:8082/books",{
            method:'POST',
            body:JSON.stringify(book),
            headers
        }).then(response => response.json())
        .then((book) => {
            if(book != null){
                this.setState({"show":true,"method":"post"}); 
                setTimeout(() => this.setState({"show":false}),3000)               
            }
            else{
                this.setState({"show":false});
            }
        });
        this.setState(this.initialState);
    }*/

    updateBook = event =>{
        event.preventDefault();
        const book = {
            id:this.state.id,
           title :this.state.title,
           author:this.state.author,
           coverPhotoUrl: this.state.coverPhotoUrl,          
           isbnNumber: this.state.isbnNumber,
            language:  this.state.language,
            price:this.state.price,
            genre:this.state.genre
            
        }
        this.props.updateBook(book);
        setTimeout(() => {
            if(this.props.updateBookObject.book != null){
                this.setState({"show":true,"method":"put"}); 
                setTimeout(() => this.setState({"show":false}),3000);               
                setTimeout(() => this.bookList(),3000);              
            }
            else{
                this.setState({"show":false});
            }
        }, 2000);
        /*axios.put("http://localhost:8082/books",book)
        .then(response => {
            if(response.data != null){
                this.setState({"show":true,"method":"put"}); 
                setTimeout(() => this.setState({"show":false}),3000);               
                setTimeout(() => this.bookList(),3000);              
            }
            else{
                this.setState({"show":false});
            }
        });*/
        this.setState(this.initialState);
    }
    // updateBook = event =>{
    //     event.preventDefault();
    //     const book = {
    //         id:this.state.id,
    //        title :this.state.title,
    //        author:this.state.author,
    //        coverPhotoUrl: this.state.coverPhotoUrl,          
    //        isbnNumber: this.state.isbnNumber,
    //         language:  this.state.language,
    //         price:this.state.price,
    //         genre:this.state.genre
            
    //     }
    //     const headers =  new Headers();
    //     headers.append("Content-Type",'application/json')
    //     fetch("http://localhost:8082/books",{
    //         method:'PUT',
    //         body:JSON.stringify(book),
    //         headers
    //     }).then(response => response.json())
    //     .then((book) => {
    //         if(book ){
    //             this.setState({"show":true,"method":"put"}); 
    //             setTimeout(() => this.setState({"show":false}),3000);               
    //             setTimeout(() => this.bookList(),3000);              
    //         }
    //         else{
    //             this.setState({"show":false});
    //         }
    //     })
    //     this.setState(this.initialState);
    // }
    bookChange=event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    }
    bookList = () =>{
        return this.props.navigate("/list");
    }
render(){
    const{title,author,coverPhotoUrl,isbnNumber,language,price,genre}=this.state;
    return (
        <div>
            <div style={{"display" : this.state.show ? "block" : "none"}}>
                <MyToast show={this.state.show } message={this.state.method === "put" ?" Book Updated Successfully.":"Book Saved Successfully."} type={"success"} />
            </div>
            <Card className={"border border-dark bg-dark text-white mt-4"}>
       <Card.Header>
  
       <FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} />{this.state.id ? "Update Book" : "Add New Book"}
        </Card.Header>
        
        <Form onReset={this.resetBook} onSubmit={this.state.id ? this.updateBook :this.SubmitBook} id="bookFormId">
        <Card.Body>
            <Row>
                <Form.Group as={Col} className="mb-3" controlId="formGridTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control 
                autoComplete='off'
                type="text" 
                name="title"
                value={title}
                onChange={this.bookChange}
                required
                className={"bg-dark text-white"}
                placeholder="Enter Book Title" />                
                </Form.Group> 
                <Form.Group  as={Col} className="mb-3" controlId="formGridTAuthor" >
                <Form.Label>Author</Form.Label>
                <Form.Control  required
                type="text" 
                autoComplete='off'                
                className={"bg-dark text-white"}
                name="author"               
                value={author}
                onChange={this.bookChange}
                placeholder="Enter Book Author" />                
                </Form.Group> 
            </Row>   
            <Row>
                <Form.Group as={Col} className="mb-3" controlId="formGridCoverPhotoUrl">
                <Form.Label>Cover Photo URL</Form.Label>
                <Form.Control required
                type="text"                 
                className={"bg-dark text-white"}
                name="coverPhotoUrl"
                value={coverPhotoUrl}
                autoComplete='off'
                onChange={this.bookChange}
                placeholder="Enter Book Cover Photo URL" />                
                </Form.Group> 
                <Form.Group  as={Col} className="mb-3" controlId="formGridIsBnNumber">
                <Form.Label>ISBN Number</Form.Label>
                <Form.Control required autoComplete='off'
                type="number" 
                className={"bg-dark text-white"}
                name="isbnNumber"                
                value={isbnNumber}
                onChange={this.bookChange}
                placeholder="Enter Book ISBN Number" />                
                </Form.Group> 
            </Row>   
            <Row>
                <Form.Group as={Col} className="mb-3" controlId="formGridPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control required autoComplete='off'
                type="number" 
                className={"bg-dark text-white"}
                name="price"                
                value={price}
                onChange={this.bookChange}
                placeholder="Enter Book Price" />                
                </Form.Group> 

                <Form.Group  as={Col} className="mb-3" controlId="formGridLanguage">
                <Form.Label>Language</Form.Label>
                <Form.Control required as= "select"                 
                value={language}
                custom
                onChange={this.bookChange}
                className={"bg-dark text-white"}                
                name="language">
                {this.state.languages.map(language => 
                <option key={language.value} value={language.value}>
                {language.display}
                </option>
                )}   
                 </Form.Control>         
                </Form.Group> 
                <Form.Group  as={Col} className="mb-3" controlId="formGridGenre">
                <Form.Label>Genre</Form.Label>
                <Form.Control required as="select"               
                custom
                value={genre}
                onChange={this.bookChange}
                className={"bg-dark text-white"}                
                name="genre">{this.state.genres.map(genre => 
                <option key={genre.value} value={genre.value}>
                {genre.display}
                </option>
                )}      
                </Form.Control>       
                </Form.Group> 
            </Row>   
        </Card.Body>
        <Card.Footer style={{"text-align":"right"}}>
        <Button size="sm" variant="success" type="submit"><FontAwesomeIcon icon={faSave} />{this.state.id ? "Update" : "Save"} </Button>{' '}
        <Button size="sm" variant="info" type="reset"><FontAwesomeIcon icon={faUndo} />Reset</Button>{' '}       
        <Button size="sm" variant="info" type="button" onClick={() => this.bookList()} > <FontAwesomeIcon icon={faList} /> Book List
              </Button>
       
        </Card.Footer>
        </Form>  
        </Card>
        </div>
        
    );
}
};

const mapStateToProps =(state) =>{
    return {
       savedBookObject:state.book,
       bookObject:state.book,
       updateBookObject:state.book,
    };
   };
   const mapDispatchToProps = dispatch =>{
   return{
       saveBook: (book) => dispatch(saveBook(book)),
       fetchBook: (bookId) => dispatch(fetchBook(bookId)),
       updateBook: (book) => dispatch(updateBook(book))
   };
   };


export default connect(mapStateToProps,mapDispatchToProps)(withParams(Book));