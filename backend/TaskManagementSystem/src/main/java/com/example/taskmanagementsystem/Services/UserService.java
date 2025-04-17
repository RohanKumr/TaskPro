package com.example.taskmanagementsystem.Services;

import java.util.List;
import java.util.Optional;

import com.example.taskmanagementsystem.Models.SelfTask;
import com.example.taskmanagementsystem.Models.Task;
import com.example.taskmanagementsystem.Models.TaskProgress;
import com.example.taskmanagementsystem.Models.User;

public interface UserService {
	  public User verifyUserLogin(User user);
	  public List<User> getAllUsers();
	  public User getUserById(Long id);
	  public String updateUser(User user);
	  public String updateUserImage(int id, byte[] imageBytes);  
	  public String resetPassword(String email,String password);
	  
	  
	  public String addTask(Task task);
	  public List<Task> getTasksAssignedBy(int id);
	  public List<Task> getTasksAssignedTo(int id);
	  public String deleteTask(Long id);
	  public void updateTask(Long id,double progress,String status);
	  
	  public String updateTaskProgress(TaskProgress taskProgress);

	  public String addSelfTask(SelfTask selfTask);
	  public List<SelfTask> getAllSelfTasks();
	  public String updateSelfTask(Long id,String status);
    // In UserService interface
    String updateTaskDetails(Task task);
	  
	  public List<TaskProgress> myreviewtaskprogress(Long id);
	  public Optional<TaskProgress> getTaskProgessById(Long id);
	  
	  public void updateReviewStatus(Long id,String remarks);

    public Optional<Task> gettask(long id);
	public List<TaskProgress> getTaskProgess(long id);
  public List<Task> searchTasks(String keyword);



}
