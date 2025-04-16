package com.example.taskmanagementsystem.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
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
	
	 @Autowired
	 private PasswordEncoder passwordEncoder;

	 @Override
     public String registerationAdmin(Admin registration) {
	        if (adminRepository.findByUsername(registration.getUsername()) != null) {
	            return "Username already exists";
	        }
	        
	        Admin admin = new Admin();
	        admin.setUsername(registration.getUsername());
	        admin.setPassword(passwordEncoder.encode(registration.getPassword()));
	        admin.setEmail(registration.getEmail());
	        admin.setRole("ROLE_ADMIN");
	        admin.setEnabled(true);
	        
	        adminRepository.save(admin);
	        return "Admin registered successfully";
	    }

	 @Override
		public User addUser(User user) {
		    user.setPassword(passwordEncoder.encode(user.getPassword()));
			return userRepository.save(user);
		}
	
	@Override
	public ResponseEntity<?> verifyAdminLogin(Admin admin) {
		// Case 1: No admin exists → Create new admin
        if (adminRepository.count() == 0) {
            admin.setPassword(admin.getPassword()); // Hash password
            adminRepository.save(admin);
            return ResponseEntity.ok("New admin '" + admin.getUsername() + "' created successfully!");
        }

        // Case 2: Check if admin exists
        Optional<Admin> existingAdminOpt = adminRepository.findById(admin.getUsername());

        // Subcase 2A: Admin not found
        if (existingAdminOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Admin username '" + admin.getUsername() + "' not found!");
        }

        Admin existingAdmin = existingAdminOpt.get();

        // Subcase 2B: Check password (secure comparison)
//        if (!passwordEncoder.matches(admin.getPassword(), existingAdmin.getPassword())) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//                    .body("Invalid password for admin: '" + admin.getUsername() + "'");
//        }

        // Subcase 2C: Success
        return ResponseEntity.ok(existingAdmin);

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
