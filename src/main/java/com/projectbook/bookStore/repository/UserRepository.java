package com.projectbook.bookStore.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.projectbook.bookStore.model.User;
@Repository
public interface UserRepository extends JpaRepository<User,Integer>{
    @Query("From User WHERE email=:email")
    User findByEmail(@Param("email") String email);
}
