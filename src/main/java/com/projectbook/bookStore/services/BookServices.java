package com.projectbook.bookStore.services;

import java.util.Collection;

import org.springframework.data.domain.Page;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;





import com.projectbook.bookStore.model.Books;
import com.projectbook.bookStore.repository.BooksRepository;

@Service
public class BookServices {
  
	private BooksRepository booksRepository;
    
    public BookServices(BooksRepository booksRepository) {
        this.booksRepository = booksRepository;
    }

    public Collection<Books> findAll() {
		return (Collection<Books>) booksRepository.findAll();
	}

    public Page<Books> findAll(Pageable pageable, String searchText) {
		return booksRepository.findAllBooks(pageable,searchText);
           
	}
    public Page<Books> findAll(Pageable pageable) {
		return booksRepository.findAll(pageable);
	}
    public Books getOneBooks(int id){
        return  booksRepository.findById(id).get();
        
     }
     public Books saveBooks(Books books) {
		Books response =booksRepository.save(books);
        return response;
	}
    public Books updateBooks( Books books){
        return booksRepository.save(books);
    }
    public void deleteById(int id){
       booksRepository.deleteById(id);
        
    }
   
}
