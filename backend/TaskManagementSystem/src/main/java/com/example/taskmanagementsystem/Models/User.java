package com.example.taskmanagementsystem.Models;

import java.sql.Blob;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="User_table")
public class User {
	
	 @Id
	  @GeneratedValue(strategy = GenerationType.IDENTITY)
	  private int id;
	  private String name;
	  private String gender;
	  private String department;
	  @Column(unique = true,nullable = false)
	  private String email;
	  private String password;
	  @Column(unique = true,nullable = false)
	  private String contact;
	  @JsonIgnore
	  private Blob userimage;
	  @Column(nullable = false)
	  private String role = "USER"; 
	  private boolean enabled = true;

	    // Getters and Setters remain the same, but add these new ones:
	    public boolean isEnabled() {
	        return enabled;
	    }

	    public void setEnabled(boolean enabled) {
	        this.enabled = enabled;
	    }
	    

	  public Blob getUserimage() {
		return userimage;
	}
	public void setUserimage(Blob userimage) {
		this.userimage = userimage;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getDepartment() {
		return department;
	}
	public void setDepartment(String department) {
		this.department = department;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getContact() {
		return contact;
	}
	public void setContact(String contact) {
		this.contact = contact;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	@Override
	public String toString() {
		return "User [id=" + id + ", name=" + name + ", gender=" + gender + ", department=" + department + ", email="
				+ email + ", password=" + password + ", contact=" + contact + ", role=" + role + "]";
	}
	  
	  


}
