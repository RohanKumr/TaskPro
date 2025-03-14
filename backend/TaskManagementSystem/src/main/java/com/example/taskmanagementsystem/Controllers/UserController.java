package com.example.taskmanagementsystem.Controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.taskmanagementsystem.Models.SelfTask;
import com.example.taskmanagementsystem.Models.Task;
import com.example.taskmanagementsystem.Models.User;
import com.example.taskmanagementsystem.Repository.UserRepository;
import com.example.taskmanagementsystem.Services.UserService;

import jakarta.mail.internet.MimeMessage;

@RestController
@CrossOrigin("*")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private JavaMailSender mailSender;
	
	@Autowired
	private UserRepository userRepository;

	@PostMapping("/verifyuserlogin")
	public ResponseEntity<?> verifyUserLogin(@RequestBody User user) {
	    User authenticatedUser = userService.verifyUserLogin(user);
	    if (authenticatedUser == null) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login Failed");
	    }
	    return ResponseEntity.ok(authenticatedUser);
	}

	@GetMapping("getallusers")
	public List<User> getallusers()
	{
		return userService.getAllUsers();
	}
	
	@PostMapping("/addtask")
	public String addtask(@RequestBody Task task)
	{
		task.setProgress(0);
		return userService.addTask(task);
	}
	
	@GetMapping("gettasksassignedby/{id}")
	public List<Task> gettasksassignedby(@PathVariable int id)
	{
		return userService.getTasksAssignedBy(id);
	}
     
	@GetMapping("gettasksassignedto/{id}")
	public List<Task> gettasksassignedto(@PathVariable int id)
	{
		return userService.getTasksAssignedTo(id);
	}
     
	@DeleteMapping("deletetask/{id}")
	public String deletetask(@PathVariable Long id)
	{
		return userService.deleteTask(id);
	}

	

	@GetMapping("getuserbyid/{id}")
	public User getuserbyid(@PathVariable Long id)
	{
		return userService.getUserById(id);
	}
	@PutMapping("updateuser")
    public String updateuser(@RequestBody User user)
    {
    	return userService.updateUser(user);
    }
    
    
    @PutMapping("/updateuserimage/{id}")
    public ResponseEntity<String> updateUserImage(@PathVariable("id") int userId, @RequestParam  MultipartFile image) 
    {
        try 
        {
            // Get image bytes
            byte[] imageBytes = image.getBytes();
            
            // Call UserService to update image
            String responseMessage = userService.updateUserImage(userId, imageBytes);

            return ResponseEntity.ok(responseMessage);
        } 
        catch (Exception e) {
            return ResponseEntity.status(500).body("Error updating user image: " + e.getMessage());
        }
    }
    
    
    @PostMapping("/addselftask")
	public String addselftask(@RequestBody SelfTask selfTask)
	{
		System.out.println(selfTask.toString());
		return userService.addSelfTask(selfTask);
	}
	
	@GetMapping("getallselftasks")
	public List<SelfTask> getallselftasks()
	{
		return userService.getAllSelfTasks();
	}
	
	@PutMapping("updateselftask")
    public String updatselftask(@RequestBody SelfTask selfTask)
    {
    	return userService.updateSelfTask(selfTask.getId(), selfTask.getStatus());
    }

	
	
	@PostMapping("forgotpassword/{email}")
	public ResponseEntity<String> forgotpassword(@PathVariable String email) {
	    try {
	        // Check if the user exists in the database
	        User user = userRepository.findByEmail(email); // Replace with your repository logic
	        if (user == null) {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
	        }

	        // Generate a reset link (assuming email is enough for identification)
	        String resetLink = "http://localhost:5173/resetpassword?email=" + email;

	        // Prepare the email
	        MimeMessage mimeMessage = mailSender.createMimeMessage();
	        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

	        helper.setTo(email);
	        helper.setSubject("Reset Your Password");
	        helper.setFrom("dileepdurgam.us@gmail.com");

	        // Email content with a reset link
	        String htmlContent =
	            "<html>" +
	                "<head>" +
	                    "<style>" +
	                        "body { font-family: Arial, sans-serif; color: #333; }" +
	                        "h3 { color: #4CAF50; }" +
	                        "p { font-size: 16px; line-height: 1.5; }" +
	                        "a { color: #1E90FF; text-decoration: none; font-weight: bold; }" +
	                        "a:hover { text-decoration: underline; }" +
	                    "</style>" +
	                "</head>" +
	                "<body>" +
	                    "<h3>Reset Your Password</h3>" +
	                    "<p>Click the link below to reset your password:</p>" +
	                    "<p><a href='" + resetLink + "'>Reset Password</a></p>" +
	                    "<p>If you did not request a password reset, please ignore this email.</p>" +
	                "</body>" +
	            "</html>";

	        helper.setText(htmlContent, true);
	        mailSender.send(mimeMessage);

	        return ResponseEntity.ok("Reset password email sent successfully.");
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while sending email: " + e.getMessage());
	    }
	}

	
	
	
    
    @PostMapping("resetpassword")
	public ResponseEntity<String> resetPassword(@RequestBody Map<String, String> payload) 
	{
	    String email = payload.get("email");
	    String newPassword = payload.get("password");
	    String confirmPassword = payload.get("confirmPassword");

	    if (!newPassword.equals(confirmPassword)) 
	    {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Passwords do not match.");
	    }

	    // Update password logic
	    User user = userRepository.findByEmail(email);
	    if (user == null) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
	    }

	    userService.resetPassword(email, confirmPassword);

	    return ResponseEntity.ok("Password updated successfully.");
	}




}
