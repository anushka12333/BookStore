package com.projectbook.bookStore.controller;

import java.util.Collection;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.projectbook.bookStore.model.Role;
import com.projectbook.bookStore.repository.RoleRepository;

import org.springframework.web.bind.annotation.PathVariable;
@RestController
@CrossOrigin
public class RoleController    {

    @Autowired
	private RoleRepository roleRepository;
	@PreAuthorize("hasRole('ADMIN') or hasRole('USERS')")
	@GetMapping("/users/role/getAll")   
	public Collection<Role> findAll() {
		return roleRepository.findAll();
	}

	@PreAuthorize("hasRole('ADMIN') or hasRole('USERS')")
    @GetMapping("/users/role/getById/{id}")    
	public Role getSingleUser(@PathVariable int id){
		return  roleRepository.findById(id).get();
		
	 }
	
	 @PreAuthorize("hasRole('ADMIN') or hasRole('USERS')")
    @GetMapping("/users/role/getbyName/{name}")    
	public Role findByName(String name) {
		return roleRepository.findByName(name);
	}
	@PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/admin/role/edit/{id}")    
    public Role updateUserDetails(@RequestBody Role role){
        return roleRepository.save(role);
    }
	@PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/admin/role/save")   
	public Role save(@RequestBody Role role) {
		return roleRepository.save(role);
	}

	@PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/admin/role/delete/{id}")  	
		public ResponseEntity<HttpStatus> deleteRoleById(@PathVariable int id){
			roleRepository.deleteById(id);
			return new ResponseEntity<HttpStatus>(HttpStatus.NO_CONTENT);
		}
}

