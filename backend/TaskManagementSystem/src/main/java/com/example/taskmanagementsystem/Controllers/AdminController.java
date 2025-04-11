package com.example.taskmanagementsystem.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
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
import com.example.taskmanagementsystem.Services.AdminService;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@RestController
@CrossOrigin("*")
public class AdminController {
	
	@Autowired
	private AdminService adminService;
	@Autowired
	private JavaMailSender mailSender;


	@PostMapping("/verifyadminlogin")
	public ResponseEntity<?> verifyAdminLogin(@RequestBody Admin admin) {
		return adminService.verifyAdminLogin(admin);
	}
	@PostMapping("adduser")
	public ResponseEntity<String> addUser(@RequestBody User user) throws MessagingException{
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

	    // MimeMessage mimeMessage = mailSender.createMimeMessage();
	    
	    // MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
	    
	    // helper.setTo(user.getEmail());
	    // helper.setSubject("Account Creation");
	    // helper.setFrom("dileepdurgam.us@gmail.com");
	    
	    // // Enhanced HTML content with styles and a login link
	    // String htmlContent =
	    // "<html>" +
	    //     "<head>" +
	    //         "<style>" +
	    //             "body { font-family: Arial, sans-serif; color: #333; }" +
	    //             "h3 { color: #4CAF50; }" +
	    //             "p { font-size: 16px; line-height: 1.5; }" +
	    //             "strong { color: #2C3E50; }" +
	    //             "a { color: #1E90FF; text-decoration: none; font-weight: bold; }" +
	    //             "a:hover { text-decoration: underline; }" +
	    //             ".footer { margin-top: 20px; font-size: 14px; color: #888; }" +
	    //         "</style>" +
	    //     "</head>" +
	    //     "<body>" +
	    //         "<h3>Welcome to Our Platform!</h3>" +
	    //         "<p><strong>Email:</strong> " + user.getEmail() + "</p>" +
	    //         "<p><strong>Password:</strong> " + user.getPassword() + "</p>" +
	    //         "<p class='footer'>Please click the link below to log in to your account:</p>" +
	    //         "<p class='footer'><a href='http://localhost:8000'>Click here to log in</a></p>" +
	    //     "</body>" +
	    // "</html>";
	    
	    // helper.setText(htmlContent, true);
	    // mailSender.send(mimeMessage);
	    
	    adminService.addUser(user);
	    return ResponseEntity.status(HttpStatus.CREATED).body("User Added Successfully");

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
