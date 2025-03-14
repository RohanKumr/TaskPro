package com.example.taskmanagementsystem.Services;

import java.util.List;
import java.util.Optional;

import javax.sql.rowset.serial.SerialBlob;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.taskmanagementsystem.Models.SelfTask;
import com.example.taskmanagementsystem.Models.Task;
import com.example.taskmanagementsystem.Models.User;
import com.example.taskmanagementsystem.Repository.SelfTaskRepository;
import com.example.taskmanagementsystem.Repository.TaskRepository;
import com.example.taskmanagementsystem.Repository.UserRepository;

@Service
public class UserServiceImpl implements UserService{
	
	@Autowired
	   private UserRepository userRepository;
	
	 @Autowired
	   private TaskRepository taskRepository;
     
	 @Autowired
	   private SelfTaskRepository selfTaskRepository;



	@Override
	public User verifyUserLogin(User user) {
		return userRepository.findByEmailAndPassword(user.getEmail(), user.getPassword());
	}

	@Override
	public List<User> getAllUsers() {
		return userRepository.findAll();
	}

	@Override
	public User getUserById(Long id) {
		return userRepository.findById(id);
	}

	@Override
	public String updateUser(User user) {
		Optional<User>  obj = 	userRepository.findById(user.getId());
	     
	     User u = obj.get();
	     //u.setDepartment(user.getDepartment());
	     //u.setEmail(user.getEmail());
	     u.setGender(user.getGender());
	     u.setName(user.getName());
	     u.setPassword(user.getPassword());
	     u.setContact(user.getContact());
	     
	     userRepository.save(u);
	     
	     return "User Upated Successfully";

	}

	@Override
	public String updateUserImage(int id, byte[] imageBytes) {
		try 
		{
            // Fetch user from the database
            User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

            // Convert the image to Blob
            SerialBlob serialBlob = new SerialBlob(imageBytes);

            // Set the new user image
            user.setUserimage(serialBlob);

            // Save the updated user
            userRepository.save(user);

            return "User image updated successfully";
        } 
		catch (Exception e) 
		{
            throw new RuntimeException("Error updating user image: " + e.getMessage());
        }

	}

	@Override
	public String resetPassword(String email, String password) {
		User u = userRepository.findByEmail(email);
		u.setPassword(password);
		userRepository.save(u);
		
		return "Password Changed Successfully";

	}
	
	@Override
	public String addTask(Task task) 
	{
	    taskRepository.save(task);
	    return "Task Assigned Successfully";
	}
	
	@Override
	public List<Task> getTasksAssignedBy(int id) 
	{
		return taskRepository.findByAssignedBy(id);
    }
	
	@Override
	public List<Task> getTasksAssignedTo(int id) 
	{
		return taskRepository.findByAssignedTo(id);
	}
	
	@Override
	public String deleteTask(Long id) 
	{
		taskRepository.deleteById(id);
		return "Task Deleted Succesfully";
	}

	@Override
	public void updateTask(Long id, double progress, String status) 
	{
		Optional<Task> obj = taskRepository.findById(id);
		
		Task t = obj.get();
		t.setProgress(progress);
		t.setStatus(status);
		
	    taskRepository.save(t);
		
	}

	@Override
	public String addSelfTask(SelfTask selfTask) {
		selfTaskRepository.save(selfTask);
		return "Task Added Successfully";
	}

	@Override
	public List<SelfTask> getAllSelfTasks() {
		return selfTaskRepository.findAll();
	}

	@Override
	public String updateSelfTask(Long id, String status) 
	{
		SelfTask selfTask = selfTaskRepository.findById(id).get();
		
		selfTask.setId(id);
		selfTask.setStatus(status);
		
		selfTaskRepository.save(selfTask);
		
		return "Self Task Updated Successfully";
	}
}
