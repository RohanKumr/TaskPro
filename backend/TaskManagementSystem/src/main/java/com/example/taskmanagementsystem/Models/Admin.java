package com.example.taskmanagementsystem.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="admin_table")
public class Admin {
    @Id
    private String username;
    private String password;
    private String email;
    private String role = "ROLE_ADMIN";
    private boolean enabled = true;

    // Getters and Setters
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public boolean isEnabled() { return enabled; }
    public void setEnabled(boolean enabled) { this.enabled = enabled; }
	@Override
	public String toString() {
		return "Admin [username=" + username + ", password=" + password + ", email=" + email + ", role=" + role
				+ ", enabled=" + enabled + "]";
	}
    
    
}