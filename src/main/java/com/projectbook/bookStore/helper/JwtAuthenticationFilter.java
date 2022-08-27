package com.projectbook.bookStore.helper;



import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    @Autowired
   private JwtUtil jwtUtil;
   @Autowired
   private UserDetailsService userDetailsService;
	
    @Override
	public void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)throws ServletException, IOException{
        String requestToken = request.getHeader("Authorization");
        System.out.println(requestToken);
        String username=null;
        String token = null;
        if(requestToken != null && requestToken.startsWith("Bearer")){
            token=requestToken.substring(7);
            try {
                username=this.jwtUtil.getUsernameFromToken(token);
            } catch (IllegalArgumentException e) {
               System.out.println("Unable to get jwt token");
            }
            catch( ExpiredJwtException e){

            System.out.println("Jwt token expired");
            }
            catch(MalformedJwtException e){
                System.out.println("invalid jwt");
            }
        }
        else{
            System.out.println("jwt token doesnot begin with bearer");

        }

        if(username != null && SecurityContextHolder.getContext().getAuthentication() == null){
            UserDetails userDetails=this.userDetailsService.loadUserByUsername(username);
            if(this.jwtUtil.validateToken(token, userDetails)){
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
                usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));


              SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);

            }
            else{
                System.out.println("invalid jwt");
            }

        }
        else{
          System.out.println("usernamre is null or context is");
        }
       filterChain.doFilter(request, response);

    
    }
    
}
