package com.projectbook.bookStore.repositoryTest;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;

import com.projectbook.bookStore.model.Books;
import com.projectbook.bookStore.repository.BooksRepository;

@SpringBootTest
public class BooksRepositoryTest {
    @Autowired
    private BooksRepository booksRepository;
    private Books getBooks(){
        Books book = new Books();
        book.setAuthor("AnuPrag");
        book.setGenre("drama");
        book.setIsbnNumber(123455);
        book.setLanguage("English");
        book.setPrice(56.56);
        book.setTitle("Rajputs");
        return book;

    }
    @Test
    public void testSaveTicket(){
        Books book= getBooks();
        booksRepository.save(book);
        Books getFromDb= booksRepository.findById(book.getId()).get();

        assertEquals(book.getId(), getFromDb.getId());	
    }
    @Test
    public void testFindById() {
       Books books = getBooks();
       booksRepository.save(books);
       Books result = booksRepository.findById(books.getId()).get();
       assertEquals(books.getId(), result.getId());	     
    }
    @Test
    public void testFindAll() {
       Books books = getBooks();
       booksRepository.save(books);
       List<Books> result = new ArrayList<>();
       booksRepository.findAll().forEach(e -> result.add(e));
       assertEquals(result.size(), 1);	     
    }
    @Test
   public void testDeleteById() {
      Books books = getBooks();
      booksRepository.save(books);
      booksRepository.deleteById(books.getId());
      List<Books> result = new ArrayList<>();
      booksRepository.findAll().forEach(e -> result.add(e));
      assertEquals(result.size(), 0);
   }
}
