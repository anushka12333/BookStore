package com.projectbook.bookStore.controller;

import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projectbook.bookStore.Utils.ConstantUtils;
import com.projectbook.bookStore.helper.JwtUtil;
import com.projectbook.bookStore.model.JwtRequest;
import com.projectbook.bookStore.model.JwtResponse;
import com.projectbook.bookStore.model.JwtSignUPRequest;
import com.projectbook.bookStore.model.User;
import com.projectbook.bookStore.repository.RoleRepository;
import com.projectbook.bookStore.repository.UserRepository;



@RestController
@RequestMapping("/users")
@CrossOrigin
public class JwtController {


	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
  private JwtUtil jwtUtil;
  @Autowired 
  private PasswordEncoder passwordEncoder;

    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;


    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody JwtSignUPRequest jwtSignUPRequest){
      User user = new User();
      user.setName(jwtSignUPRequest.getName());
      user.setEmail(jwtSignUPRequest.getEmail());
      user.setMobile(jwtSignUPRequest.getMobile());
      user.setPassword(passwordEncoder.encode(jwtSignUPRequest.getPassword()));
      user.setRole(roleRepository.findByName(ConstantUtils.ROLE_USERS.toString()));
      userRepository.save(user);

    
     return new ResponseEntity<String>(HttpStatus.OK);

    }

    
    @PostMapping("/login")
    public ResponseEntity<JwtResponse> createToken(@RequestBody JwtRequest request){
      try{
      this.authenticate(request.getUsername(),request.getPassword());
      }
      catch(Exception e1){
        e1.printStackTrace();
      }
      UserDetails userDetails= this.userDetailsService.loadUserByUsername(request.getUsername());
      String token =this.jwtUtil.generateToken(userDetails);
      JwtResponse response=new JwtResponse();
      response.setToken(token);  
     return new ResponseEntity<JwtResponse>(response,HttpStatus.OK);

    }

    private void authenticate(String username, String password) throws Exception {

      UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username, password);
      try {
        this.authenticationManager.authenticate(authenticationToken);
      } catch (BadCredentialsException e) {
        System.out.println("Invalid details");
        throw new Exception("Invalid username or password !!");
      }
    }

}