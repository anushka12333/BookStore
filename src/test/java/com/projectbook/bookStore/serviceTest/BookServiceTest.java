package com.projectbook.bookStore.serviceTest;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.*;
import org.springframework.boot.test.context.SpringBootTest;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import com.projectbook.bookStore.model.Books;
import com.projectbook.bookStore.repository.BooksRepository;
import com.projectbook.bookStore.services.BookServices;


@ExtendWith(MockitoExtension.class)
@SpringBootTest
public class BookServiceTest {
   
    BookServices bookServices;

    @Mock
    private BooksRepository booksRepository;
    @BeforeEach
    void initUseCase(){
       this.bookServices= new BookServices(booksRepository);
    }
    @Test
    public void  saveBooks(){
        Books book = new Books();
        book.setAuthor("Dan Brown");
        book.setGenre("Hitorical");
        book.setIsbnNumber(4356);
        book.setLanguage("Hindi");
        book.setPrice(25.34);
        book.setTitle("Book Cover");

        when(booksRepository.save(any(Books.class))).thenReturn(book);
        
    }
    @Test
    public void books_exists_in_db_success() {
        Books book = new Books();
        book.setAuthor("Dan Brown");
        book.setGenre("Hitorical");
        book.setIsbnNumber(4356);
        book.setLanguage("Hindi");
        book.setPrice(25.34);
        book.setTitle("Book Cover");
        List<Books> bookList = new ArrayList<>();
        bookList.add(book);

        // providing knowledge
        when(booksRepository.findAll()).thenReturn(bookList);

        Collection<Books> fetchedbooks =bookServices.findAll();
        assertThat(fetchedbooks.size()).isGreaterThan(0);
    }
}
