package com.example.taskmanagementsystem.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.taskmanagementsystem.Models.Admin;

public interface AdminRepository extends JpaRepository<Admin,String>{
	
	public Admin findByUsernameAndPassword(String username, String password);
}
