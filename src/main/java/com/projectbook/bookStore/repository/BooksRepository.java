package com.projectbook.bookStore.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
// import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import com.projectbook.bookStore.model.Books;

public interface BooksRepository extends PagingAndSortingRepository<Books,Integer>{
    @Query("From Books b WHERE b.author LIKE %:searchText% OR b.title LIKE %:searchText% OR b.language LIKE %:searchText% OR b.genre LIKE %:searchText% ORDER BY b.price DESC ")
    Page<Books> findAllBooks(Pageable pageable,@Param("searchText") String searchText);
}
