package com.example.taskmanagementsystem.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.taskmanagementsystem.Models.Admin;
import com.example.taskmanagementsystem.Models.User;
import com.example.taskmanagementsystem.Services.AdminService;

@RestController
@CrossOrigin("*")
public class AdminController {
	
	@Autowired
	private AdminService adminService;

	@PostMapping("/verifyadminlogin")
	public ResponseEntity<?> verifyAdminLogin(@RequestBody Admin admin) {
	    Admin authenticatedUser = adminService.verifyAdminLogin(admin);
	    if (authenticatedUser == null) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login Failed");
	    }
	    return ResponseEntity.ok(authenticatedUser);
	}
	
	
	@PostMapping("adduser")
	public void addUser(@RequestBody User user){
		adminService.addUser(user);
	}

	
	
	// fetching all the users
	@GetMapping("viewallusers")
	public List<User> viewallusers()
	{
		   return adminService.viewAllUsers();
	}
	
	
	// deleting the particular user by providing the user id
	@DeleteMapping("deleteuser/{id}")
	public String deleteuser(@PathVariable int id)
	{
		return adminService.deleteUser(id);
	}



}
