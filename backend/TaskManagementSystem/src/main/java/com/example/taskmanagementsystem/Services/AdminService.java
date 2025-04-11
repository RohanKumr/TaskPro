package com.example.taskmanagementsystem.Services;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.example.taskmanagementsystem.Models.Admin;
import com.example.taskmanagementsystem.Models.Task;
import com.example.taskmanagementsystem.Models.User;

public interface AdminService {
	
	  public ResponseEntity<?> verifyAdminLogin(Admin admin);
	  public User addUser(User user);
	  public List<User> viewAllUsers();
	  public String deleteUser(int id);
	  public boolean isEmailExist(String email);
	  public boolean isContactExist(String contact);
	  
	  public List<Task> getAllTasks();
}
