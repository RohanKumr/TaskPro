package com.example.taskmanagementsystem.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.taskmanagementsystem.Models.User;

public interface UserRepository extends JpaRepository<User,Integer>{
	
	
	  public User findByEmailAndPassword(String email, String password);
	  public User findById(Long id);
	  public User findByEmail(String email);
	  public User findByContact(String contact);
    @Query("SELECT u FROM User u WHERE LOWER(u.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(u.email) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<User> searchByNameOrEmail(@Param("keyword") String keyword);
 


}
