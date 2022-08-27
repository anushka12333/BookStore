import React from 'react'
import Welcome from './components/Welcome'
import './App.css';
import NavBar from './components/NavBar';
import UserList from './components/UserList';
import { Container,Row } from 'react-bootstrap';
import Footer from './components/Footer';
import BookList from './components/BookList';
import Book from './components/Book';
import Login from './components/User/Login';
import Register from './components/User/Register';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'


function App() {
  
  return (
   <Router>
  <NavBar/>
  <Container>
    <Row>
    <Routes>
    <Route path="/" exact element={<Welcome />} />
    <Route path="/add" exact element={<Book />} /> 
    <Route path="/list" exact element={<BookList />} />
    <Route path="/users" exact element={<UserList />} />
    <Route path="/list/edit/:bookId" exact element={<Book />} />
    <Route path="/login" exact element={<Login />} />
    <Route path="/logout" exact element={<Login />} />
    <Route path="/register" exact element={<Register />} />
   
   
   </Routes>
    </Row>
  </Container>
    <Footer/>
    </Router>
  );
}

export default App;
