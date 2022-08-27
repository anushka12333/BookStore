package com.projectbook.bookStore.controller;


import java.util.Arrays;

import java.util.Set;
import java.util.TreeSet;

// import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RestController;

import com.projectbook.bookStore.model.Books;
import com.projectbook.bookStore.repository.BooksRepository;

/**
 * BooksController
 */
@RestController
@CrossOrigin
public class BooksController {  
    @Autowired
	private BooksRepository booksRepository;

    
    @PreAuthorize("hasRole('ADMIN') or hasRole('USERS')")
    @GetMapping("/books/search/{searchText}")    
	public Page<Books> findAll(Pageable pageable,@PathVariable String searchText) {
		return booksRepository.findAllBooks(pageable,searchText);
           
	}
    @PreAuthorize("hasRole('ADMIN') or hasRole('USERS')")
    @GetMapping("/books")    
	public Page<Books> findAll(int pageNumber,int pageSize,String sortBy,String sortDir) {
		return this.booksRepository.findAll(
            PageRequest.of(
                pageNumber,pageSize,
                sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending()

                )
        );
	}
    @PreAuthorize("hasRole('ADMIN') or hasRole('USERS')")
    @GetMapping("/books/{id}")
    public Books getSingleBooks(@PathVariable int id){
       return  booksRepository.findById(id).get();
       
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/books")  
	public Books addBooks(@RequestBody Books books) {
		Books response =booksRepository.save(books);
        return response;
	}
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/books")    
    public Books updateBooksDetails(@RequestBody Books books){
        return booksRepository.save(books);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/books/{id}")
	public ResponseEntity<HttpStatus> deleteBooksById(@PathVariable int id){
        booksRepository.deleteById(id);
        return new ResponseEntity<HttpStatus>(HttpStatus.NO_CONTENT);
    }
   
    @GetMapping("/books/languages")
    public Set<String> findAllLanguages(){
       return (new TreeSet<>(Arrays.asList("French","Portuguese","Russian","English","Hindi","Arabic","Spanish","Cinese")));


    }
    @GetMapping("/books/genres")
    public Set<String> findAllGenres(){
       return (new TreeSet<>(Arrays.asList("Romance","Horrow","Biography","Fantasy","History","Science","Bilogy","Technology","Science","Technology")));
       
    }
}