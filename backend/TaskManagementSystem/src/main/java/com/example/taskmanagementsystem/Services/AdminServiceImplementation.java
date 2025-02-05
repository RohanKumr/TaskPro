package com.example.taskmanagementsystem.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.taskmanagementsystem.Models.Admin;
import com.example.taskmanagementsystem.Models.User;
import com.example.taskmanagementsystem.Repository.AdminRepository;
import com.example.taskmanagementsystem.Repository.UserRepository;

@Service
public class AdminServiceImplementation implements AdminService {
	
	@Autowired
    private AdminRepository adminRepository;
	
	@Autowired
    private UserRepository userRepository;
	
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
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isContactExist(String contact) {
		// TODO Auto-generated method stub
		return false;
	}

}
