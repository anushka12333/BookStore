package com.projectbook.bookStore;


// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// import org.springframework.security.crypto.password.PasswordEncoder;

// import com.projectbook.bookStore.Utils.ConstantUtils;
// import com.projectbook.bookStore.model.Role;
// import com.projectbook.bookStore.model.User;

// import com.projectbook.bookStore.repository.RoleRepository;
// import com.projectbook.bookStore.repository.UserRepository;




@SpringBootApplication
public class BooksApplication implements CommandLineRunner{


	// @Autowired
	// private UserRepository userRepository;
	// @Autowired
	// private RoleRepository roleRepository;
	// @Autowired
	// private PasswordEncoder passwordEncoder;
	

	public static void main(String[] args) {
		SpringApplication.run(BooksApplication.class, args);
		System.out.println("helo");
	}


	@Override
	public void run(String... args) throws Exception {
	 
	//    roleRepository.save(new Role(ConstantUtils.ROLE_ADMIN.toString()));
	//    roleRepository.save(new Role(ConstantUtils.ROLE_USERS.toString()));

   

	// 	User user1 = new User();
	// 	user1.setName("anushka");
	// 	user1.setEmail("anushk@123");
	// 	user1.setMobile(23234);
	// 	user1.setPassword(passwordEncoder.encode("anu"));
	// 	user1.setRole(roleRepository.findByName(ConstantUtils.ROLE_USERS.toString()));
	// 	userRepository.save(user1);

	// 	User user2 = new User();
	// 	user2.setName("pragati");
	// 	user2.setEmail("prag@123");
	// 	user2.setMobile(2323445);
	// 	user2.setPassword(passwordEncoder.encode("anush"));
	// 	user2.setRole(roleRepository.findByName(ConstantUtils.ROLE_ADMIN.toString()));
	// 	userRepository.save(user2);
		
	}

	

}
