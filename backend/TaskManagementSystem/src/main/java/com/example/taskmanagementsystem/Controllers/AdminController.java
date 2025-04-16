package com.example.taskmanagementsystem.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


import com.example.taskmanagementsystem.Models.Admin;
import com.example.taskmanagementsystem.Models.Task;
import com.example.taskmanagementsystem.Models.User;
import com.example.taskmanagementsystem.Repository.AdminRepository;
import com.example.taskmanagementsystem.Services.AdminService;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@RestController
@CrossOrigin("*")
public class AdminController {
	
	@Autowired
	private AdminService adminService;
	
	@Autowired
	private AdminRepository adminRepository;
	@Autowired
	private JavaMailSender mailSender;
	
	@Autowired  // Spring injects the bean automatically
    private AuthenticationManager authenticationManager; 
	
	
	@PostMapping("/register-admin")
	public ResponseEntity<String> registerAdmin(@RequestBody Admin registration) {
	    String result = adminService.registerationAdmin(registration);
	    if (result.equals("Username already exists")) {
	        return ResponseEntity.badRequest().body(result);
	    }
	    return ResponseEntity.ok(result);
	}
	
	@PostMapping("/verifyadminlogin")
	public ResponseEntity<?> verifyAdminLogin(@RequestBody Admin admin) {
	    try {
	        Authentication authentication = authenticationManager.authenticate(
	            new UsernamePasswordAuthenticationToken(
	                admin.getUsername(),
	                admin.getPassword()
	            )
	        );
	        
	     // 2. Check if the user is an ADMIN (exists in admin_table)
	        Admin authenticatedAdmin = adminRepository.findByUsername(admin.getUsername());
	        if (authenticatedAdmin == null) {
	            return ResponseEntity.status(403).body("Access denied: Not an admin.");
	        }
	        return ResponseEntity.ok(authenticatedAdmin.getUsername()+"login successful");
	    } catch (Exception e) {
	        return ResponseEntity.status(401).body("Login failed: Invalid credentials");
	    }
	}


	
	@PostMapping("adduser")
	public ResponseEntity<String> addUser(@RequestBody User user,Authentication authentication) throws MessagingException{
		
		if (!isAdmin(authentication)) {
	        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Only admins can add users.");
	    }
		
		// Check if the email already exists
	    if (adminService.isEmailExist(user.getEmail())) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
	                             .body("Email already exists");
	    }
	    
	    // Check if the contact number already exists
	    if (adminService.isContactExist(user.getContact())) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
	                             .body("Contact number already exists");
	    }
	    adminService.addUser(user);
	    return ResponseEntity.status(HttpStatus.CREATED).body("User Added Successfully");

	}
	private boolean isAdmin(Authentication authentication) {
	    String username = authentication.getName();
	    Admin admin = adminRepository.findByUsername(username); // Check admin_table
	    return admin != null; // True only if user exists in admin_table
	}

	
	
	// fetching all the users
	@GetMapping("viewallusers")
	public List<User> viewallusers()
	{
		   return adminService.viewAllUsers();
	}
	
	
	// deleting the particular user by providing the user id
	@DeleteMapping("deleteuser/{id}")
	public String deleteuser(@PathVariable("id") int id)
	{
		return adminService.deleteUser(id);
	}
	
	@GetMapping("getalltasks")
	public List<Task> getalltasks()
	{
		   return adminService.getAllTasks();
	}




}
