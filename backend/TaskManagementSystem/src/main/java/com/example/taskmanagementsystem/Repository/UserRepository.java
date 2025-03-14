package com.example.taskmanagementsystem.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.taskmanagementsystem.Models.User;

public interface UserRepository extends JpaRepository<User,Integer>{
	
	
	  public User findByEmailAndPassword(String email, String password);
	  public User findById(Long id);
	  public User findByEmail(String email);
	  public User findByContact(String contact);


}
