package com.example.taskmanagementsystem.Services;

import java.util.List;
import java.util.Optional;

import javax.sql.rowset.serial.SerialBlob;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.taskmanagementsystem.Models.SelfTask;
import com.example.taskmanagementsystem.Models.Task;
import com.example.taskmanagementsystem.Models.TaskProgress;
import com.example.taskmanagementsystem.Models.User;
import com.example.taskmanagementsystem.Repository.SelfTaskRepository;
import com.example.taskmanagementsystem.Repository.TaskProgressRepository;
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
	 @Autowired
	  private TaskProgressRepository taskProgressRepository;



    @Override
	public Optional<Task> gettask(long id) {
		
		return Optional.of(taskRepository.findById(id).orElse(null));
	}
    
    @Override
	public List<TaskProgress> getTaskProgess(long id) {
		return taskProgressRepository.findByTaskid(id);
	}

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

  public List<Task> searchTasks(String keyword) {
    return taskRepository.searchTasks(keyword);
  }
 

	@Override
	public String updateUser(User user) {
		Optional<User>  obj = 	userRepository.findById(user.getId());
	     
	     User u = obj.get();
	     u.setDepartment(user.getDepartment());
	     //u.setEmail(user.getEmail());
	     u.setGender(user.getGender());
	     u.setName(user.getName());
	     u.setPassword(user.getPassword());
	     u.setContact(user.getContact());
	     
	     userRepository.save(u);
	     
	     return "User Upated Successfully";

	}

  // In UserServiceImpl
@Override
public String updateTaskDetails(Task task) {
    Optional<Task> existingTaskOpt = taskRepository.findById(task.getId());
    if (existingTaskOpt.isPresent()) {
        Task existingTask = existingTaskOpt.get();
        // Only allow updating certain fields
        existingTask.setDescription(task.getDescription());
        existingTask.setPriority(task.getPriority());
        existingTask.setEndDate(task.getEndDate());
        existingTask.setRemarks(task.getRemarks());
        existingTask.setProgress(task.getProgress());
        existingTask.setStatus(task.getStatus());
        taskRepository.save(existingTask);
        return "Task updated successfully";
    }
    return "Task not found";
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
		 // Check if assignedBy user exists
	    if (!userRepository.existsById(task.getAssignedBy())) {
	        return "Cannot add task: User with ID '" + task.getAssignedBy() + "' (assignedBy) does not exist";
	    }
	    // Check if assignedTo user exists
	    if (!userRepository.existsById(task.getAssignedTo())) {
	        return "Cannot add task: User with ID '" + task.getAssignedTo() + "' (assignedTo) does not exist";
	    }
	    
	    // Both users exist, proceed to save
	    taskRepository.save(task);
	    
	 // Create initial task progress record
        TaskProgress initialProgress = new TaskProgress();
        initialProgress.setTaskid(task.getId());
        initialProgress.setProgress(0);
        taskProgressRepository.save(initialProgress);
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
	public String updateTaskProgress(TaskProgress taskProgress) {
	    // 1. Save TaskProgress
	    taskProgressRepository.save(taskProgress);

	    // 2. Update corresponding Task
	    Optional<Task> optionalTask = taskRepository.findById(taskProgress.getTaskid());
	    if (optionalTask.isPresent()) {
	        Task task = optionalTask.get();
	        task.setProgress(taskProgress.getProgress());
	        task.setRemarks(taskProgress.getRemarks1()); // Map remarks1 (TaskProgress) → remarks (Task)
	        task.setStatus(taskProgress.getReviewstatus()); // Map reviewstatus → status
	        taskRepository.save(task);
	    } else {
	        throw new RuntimeException("Task not found with ID: " + taskProgress.getTaskid());
	    }
	    return "Task Progress Updated Successfully";
	}
	
	@Override
	public List<TaskProgress> myreviewtaskprogress(Long id) 
	{
		return taskProgressRepository.findByTaskid(id);
	}

	@Override
	public Optional<TaskProgress> getTaskProgessById(Long id) 
	{
		return taskProgressRepository.findById(id);
	}

	@Override
	public void updateReviewStatus(Long id,String remarks) 
	{
        Optional<TaskProgress> obj = taskProgressRepository.findById(id);
		
		TaskProgress tp = obj.get();
		tp.setReviewstatus("REVIEWED");
		tp.setRemarks2(remarks);
		
		taskProgressRepository.save(tp);
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
