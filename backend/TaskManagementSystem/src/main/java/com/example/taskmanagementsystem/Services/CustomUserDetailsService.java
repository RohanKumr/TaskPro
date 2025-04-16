package com.example.taskmanagementsystem.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.taskmanagementsystem.Models.Admin;
import com.example.taskmanagementsystem.Models.User;
import com.example.taskmanagementsystem.Repository.AdminRepository;
import com.example.taskmanagementsystem.Repository.UserRepository;

@Service 
public class CustomUserDetailsService  implements UserDetailsService{

	@Autowired
    private UserRepository userRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Check user table first
        User user = userRepository.findByEmail(username);
        if (user != null) {
            return org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .roles(user.getRole())
                .disabled(!user.isEnabled())
                .build();
        }

        // Check admin table if user not found
        Admin admin = adminRepository.findByUsername(username);
        if (admin != null) {
            return org.springframework.security.core.userdetails.User.builder()
                .username(admin.getUsername())
                .password(admin.getPassword())
                .roles(admin.getRole().replace("ROLE_", ""))
                .disabled(!admin.isEnabled())
                .build();
        }

        throw new UsernameNotFoundException("User not found: " + username);
    }

}
