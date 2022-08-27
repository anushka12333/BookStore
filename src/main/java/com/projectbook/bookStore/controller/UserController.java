package com.projectbook.bookStore.controller;
import java.util.Collection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.projectbook.bookStore.model.User;
import com.projectbook.bookStore.repository.UserRepository;

@RestController
@CrossOrigin
public class UserController {
    
    @Autowired
	private UserRepository userRepository;
    @PreAuthorize("hasRole('ADMIN') or hasRole('USERS')")
    @GetMapping("/users/normal/getAll")    
	public Collection<User> findAll() {
		return userRepository.findAll();
	}
    @PreAuthorize("hasRole('ADMIN') or hasRole('USERS')")
    @GetMapping("/users/normal/getbyId/{id}")
    public User getSingleUser(@PathVariable int id){
       return  userRepository.findById(id).get();
       
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/admin/normal/save")    
	public User save(@RequestBody User user) {
		return userRepository.save(user);
	}

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/admin/normal/edit/{id}")    
    public User updateUserDetails(@RequestBody User user){
        return userRepository.save(user);
    }


    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/admin/normal/deletebyId/{id}")
	public ResponseEntity<HttpStatus> deleteUserById(@PathVariable int id){
        userRepository.deleteById(id);
        return new ResponseEntity<HttpStatus>(HttpStatus.NO_CONTENT);
    }
}
