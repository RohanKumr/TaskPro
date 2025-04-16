package com.example.taskmanagementsystem.Controllers;

import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.taskmanagementsystem.DTO.TaskDTO;
import com.example.taskmanagementsystem.DTO.TaskProgressDTO;
import com.example.taskmanagementsystem.DTO.TaskReviewUpdateDTO;
import com.example.taskmanagementsystem.Models.SelfTask;
import com.example.taskmanagementsystem.Models.Task;
import com.example.taskmanagementsystem.Models.TaskProgress;
import com.example.taskmanagementsystem.Models.User;
import com.example.taskmanagementsystem.Repository.UserRepository;
import com.example.taskmanagementsystem.Services.UserService;

import jakarta.mail.internet.MimeMessage;

@RestController
@CrossOrigin("*")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private JavaMailSender mailSender;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired  
    private AuthenticationManager authenticationManager; 
	
	
	@PostMapping("/verifyuserlogin")
	public ResponseEntity<?> verifyUserLogin(@RequestBody User user) {
	    try {
	        Authentication authentication = authenticationManager.authenticate(
	            new UsernamePasswordAuthenticationToken(
	                user.getEmail(),
	                user.getPassword()
	            )
	        );
	        
	     // 2. Verify the user exists in User_table (not Admin_table)
	        User authenticatedUser = userRepository.findByEmail(user.getEmail());
	        if (authenticatedUser == null) {
	            return ResponseEntity.status(403).body("Access denied: Not a user.");
	        }
	        return ResponseEntity.ok(authenticatedUser.getName()+" login successful");
	    } catch (Exception e) {
	        return ResponseEntity.status(401).body("Login failed: Invalid credentials");
	    }
	}

    @GetMapping("gettaskbyid/{id}")   
	public TaskDTO findByTaskId(@PathVariable ("id") long id){
    	
    	Task currentTask = userService.gettask(id).get();
    	TaskProgress taskProgress= userService.getTaskProgess(id).get(0);
    	
    	TaskDTO taskDto= new TaskDTO(taskProgress.getId(),currentTask.getId(),currentTask.getCategory(),currentTask.getName(),currentTask.getDescription(),currentTask.getPriority()); 
        taskDto.setRemarks("");
        taskDto.setReviewstatus("");
    	
    	return taskDto;
	}
    
    @PostMapping("/updatetaskprogress")
    public ResponseEntity<String> updateTaskProgress(
            @RequestParam("taskid") Long taskid,
            @RequestParam("progress") double progress,
            @RequestParam("remarks") String remarks,
            @RequestParam(value = "progressfile", required = false) MultipartFile progressfile,
            @RequestParam("updatedBy") int updatedBy) {

        try {
            TaskProgress taskProgress = new TaskProgress();
            taskProgress.setTaskid(taskid);
            taskProgress.setProgress(progress);
            taskProgress.setRemarks1(remarks); // Will sync to Task.remarks
            taskProgress.setUpdatedBy(updatedBy);
            taskProgress.setReviewstatus("SUBMITTED FOR REVIEW"); // Will sync to Task.status

            if (progressfile != null && !progressfile.isEmpty()) {
                Blob progressBlob = createBlobFromMultipartFile(progressfile);
                taskProgress.setProgressfile(progressBlob);
            }

            userService.updateTaskProgress(taskProgress); // This now updates both tables
            return ResponseEntity.ok("Task progress updated successfully");
        } catch (IOException | SQLException e) {
            return ResponseEntity.status(500).body("Failed: " + e.getMessage());
        }
    }
    
    @PutMapping("updatetask")
    public ResponseEntity<String> updatetask(@RequestBody TaskReviewUpdateDTO request) 
    {
        Long taskid = request.getTaskid();
        Long progressid = request.getProgressid();
        Double progress = request.getProgress();
        String remarks = request.getRemarks();
        
        System.out.println(taskid);

        if (progress == null) {
            return ResponseEntity.badRequest().body("Progress value is required.");
        }

        // Update the task based on progress
        if (progress == 100) 
        {
            userService.updateTask(taskid, progress, "COMPLETED");
        } 
        else 
        {
            userService.updateTask(taskid, progress, "IN PROGRESS");
        }

        // Update review status regardless of progress value
        userService.updateReviewStatus(progressid, remarks);

        return ResponseEntity.ok("Task has been reviewed successfully");
    }
	@GetMapping("getallusers")
	public List<User> getallusers()
	{
		return userService.getAllUsers();
	}
	
	@PostMapping("/addtask")
	public String addtask(@RequestBody Task task)
	{
		task.setProgress(0);
		return userService.addTask(task);
	}
	
	@GetMapping("gettasksassignedby/{id}")
	public List<Task> gettasksassignedby(@PathVariable("id") int id)
	{
		return userService.getTasksAssignedBy(id);
	}
     
	@GetMapping("gettasksassignedto/{id}")
	public List<Task> gettasksassignedto(@PathVariable("id") int id)
	{
		return userService.getTasksAssignedTo(id);
	}
     
	@DeleteMapping("deletetask/{id}")
	public String deletetask(@PathVariable("id") long id)
	{
		return userService.deleteTask(id);
	}

	@GetMapping("getuserbyid/{id}")
	public User getuserbyid(@PathVariable("id") long id)
	{
		return userService.getUserById(id);
	}
	
	@PutMapping("updateuser")
    public String updateuser(@RequestBody User user)
    {
    	return userService.updateUser(user);
    }
	

    private Blob createBlobFromMultipartFile(MultipartFile file) throws IOException, SQLException 
    {
        byte[] fileBytes = file.getBytes();
        return new javax.sql.rowset.serial.SerialBlob(fileBytes);
    }

    @GetMapping("myreviewtaskprogress/{id}")
    public List<TaskProgressDTO> myreviewtaskprogress(@PathVariable ("id") Long id) {
        List<TaskProgress> taskProgressList = userService.myreviewtaskprogress(id);

        return taskProgressList.stream().map(taskProgress -> {
            TaskProgressDTO dto = new TaskProgressDTO();
            dto.setId(taskProgress.getId());
            dto.setTaskid(taskProgress.getTaskid());
            dto.setProgress(taskProgress.getProgress());
            dto.setRemarks(taskProgress.getRemarks1());
            dto.setReviewstatus(taskProgress.getReviewstatus());
            dto.setProgressUpdatedTime(taskProgress.getProgressUpdatedTime().toString());
            dto.setHasFile(taskProgress.getProgressfile() != null); // Add a flag for file presence
            return dto;
        }).collect(Collectors.toList());
    }

    
    @GetMapping("downloadprogressfile/{id}")
    public ResponseEntity<?> downloadProgressFile(@PathVariable ("id") Long id) {
        Optional<TaskProgress> optionalTaskProgress = userService.getTaskProgessById(id);
        
        if (optionalTaskProgress.isPresent()) {
            TaskProgress taskProgress = optionalTaskProgress.get();
            
            if (taskProgress.getProgressfile() != null) {
                try {
                    byte[] pdfBytes = taskProgress.getProgressfile().getBytes(1, (int) taskProgress.getProgressfile().length());
                    
                    return ResponseEntity.ok()
                            .contentType(MediaType.APPLICATION_PDF)
                            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=Task_" + id + "_Progress.pdf")
                            .body(pdfBytes);
                } catch (Exception e) {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error reading file.");
                }
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("File not found for task ID: " + id);
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Task progress not found for ID: " + id);
        }
    }
    
    
    

    
    
    @PutMapping("/updateuserimage/{id}")
    public ResponseEntity<String> updateUserImage(@PathVariable("id") int userId, @RequestParam  MultipartFile image) 
    {
        try 
        {
            // Get image bytes
            byte[] imageBytes = image.getBytes();
            
            // Call UserService to update image
            String responseMessage = userService.updateUserImage(userId, imageBytes);

            return ResponseEntity.ok(responseMessage);
        } 
        catch (Exception e) {
            return ResponseEntity.status(500).body("Error updating user image: " + e.getMessage());
        }
    }
    
    
    @PostMapping("/addselftask")
	public String addselftask(@RequestBody SelfTask selfTask)
	{
		System.out.println(selfTask.toString());
		return userService.addSelfTask(selfTask);
	}
	
	@GetMapping("getallselftasks")
	public List<SelfTask> getallselftasks()
	{
		return userService.getAllSelfTasks();
	}
	
	@PutMapping("updateselftask")
    public String updatselftask(@RequestBody SelfTask selfTask)
    {
    	return userService.updateSelfTask(selfTask.getId(), selfTask.getStatus());
    }
}
