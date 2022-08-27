// package com.projectbook.bookStore.config;
// import java.util.Collection;
// import java.util.HashSet;


// import org.springframework.security.core.GrantedAuthority;
// import org.springframework.security.core.userdetails.UserDetails;

// import com.projectbook.bookStore.model.User;

// import org.springframework.security.core.authority.SimpleGrantedAuthority;

// public class CustomUserDetails implements UserDetails {

//   private User user;

 
// public CustomUserDetails(User user) {
//     this.user = user;
// }

// @Override
// public Collection<? extends GrantedAuthority> getAuthorities() {
//     HashSet<SimpleGrantedAuthority> authorties = new HashSet<>();
//     authorties.add(new SimpleGrantedAuthority(this.user.getRole().getName()));
//      return authorties;
//  }

// @Override
// public String getPassword() {

//     return this.user.getPassword();
// }

// @Override
// public String getUsername() {
    
//     return this.user.getEmail();
// }



// public boolean isAccountNonExpired() {
        
//     return true;
// }
// @Override
// public boolean isAccountNonLocked() {
    
//     return true;
// }
// @Override
// public boolean isCredentialsNonExpired() {
    
//     return true;
// }
// @Override
// public boolean isEnabled() {
    
//     return true;
// }
// }
