package com.example.taskmanagementsystem.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.taskmanagementsystem.Models.Admin;
import com.example.taskmanagementsystem.Models.Task;
import com.example.taskmanagementsystem.Models.User;
import com.example.taskmanagementsystem.Repository.AdminRepository;
import com.example.taskmanagementsystem.Repository.TaskRepository;
import com.example.taskmanagementsystem.Repository.UserRepository;

@Service
public class AdminServiceImplementation implements AdminService {
	
	@Autowired
    private AdminRepository adminRepository;
	
	@Autowired
    private UserRepository userRepository;
	
	@Autowired
	private TaskRepository taskRepository;

	
	@Override
	public Admin verifyAdminLogin(Admin admin) {
		return adminRepository.findByUsernameAndPassword(admin.getUsername(),admin.getPassword());
	}

	@Override
	public User addUser(User user) {
		return userRepository.save(user);
	}

	@Override
	public List<User> viewAllUsers() {
		return (List<User>) userRepository.findAll();
	}

	@Override
	public String deleteUser(int id) {
		userRepository.deleteById(id);
		return "User Deleted Successfully";

	}

	@Override
	public boolean isEmailExist(String email) {
		if(userRepository.findByEmail(email)!=null)
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	@Override
	public boolean isContactExist(String contact) {
		if(userRepository.findByContact(contact)!=null)
		{
			return true;
		}
		else
		{
			return false;
		}

	}
	@Override
	public List<Task> getAllTasks() 
	{
		return taskRepository.findAll();
	}


}
