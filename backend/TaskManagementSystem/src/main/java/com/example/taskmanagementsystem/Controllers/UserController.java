package com.example.taskmanagementsystem.Controllers;

import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.HashMap;
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
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.Authentication;
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
import com.example.taskmanagementsystem.Repository.TaskRepository;
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
  private 
  TaskRepository taskRepository;



	
	
	@PostMapping("/verifyuserlogin")
public ResponseEntity<Map<String, Object>> verifyUserLogin(@RequestBody User user) {
    try {
        User existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser == null) {
            return ResponseEntity.status(403).body(Map.of("error", "Access denied: Not a registered user."));
        }

        if (!user.getPassword().equals(existingUser.getPassword())) {
            return ResponseEntity.status(401).body(Map.of("error", "Login failed: Invalid credentials"));
        }

        // Optional: remove password before returning the user object
        existingUser.setPassword(null);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Login successful");
        response.put("user", existingUser);

        System.out.println("+++++++++++++++++++++++++++++++++++++++++++");
        System.out.println("Existing USER IMAGE: ->" + existingUser.getUserimage());

        return ResponseEntity.ok(response);

    } catch (Exception e) {
        return ResponseEntity.status(500).body(Map.of("error", "Internal server error: " + e.getMessage()));
    }
}



    
 
@PutMapping("/update")
public ResponseEntity<Map<String, String>> updateTask(@RequestBody Task task) {
    String result = userService.updateTaskDetails(task);
    Map<String, String> response = new HashMap<>();

    if (result.equals("Task updated successfully")) {
        response.put("status", "success");
        response.put("message", result);
        return ResponseEntity.ok(response);
    }

    response.put("status", "error");
    response.put("message", result);
    return ResponseEntity.badRequest().body(response);
}

@GetMapping("/searchtasks")
public ResponseEntity<List<Task>> searchTasks(@RequestParam("keyword") String keyword) {
    try {
        List<Task> tasks = userService.searchTasks(keyword);
        if (tasks.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(tasks);
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
}


@GetMapping("gettaskbyid/{id}")   
public ResponseEntity<?> getTaskById(@PathVariable("id") long id) {
  Optional<Task> task = userService.gettask(id);
  if (task.isPresent()) {
      return ResponseEntity.ok(task.get());
  }
  return ResponseEntity.notFound().build();
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
	public ResponseEntity<Map<String, Object>> addtask(@RequestBody Task task) {
    task.setProgress(0);

    // Call the service method to add the task
    String responseMessage = userService.addTask(task);

    // Create a map to hold the response data
    Map<String, Object> response = new HashMap<>();
    
    if ("Task Assigned Successfully".equals(responseMessage)) {
        response.put("success", true);
        response.put("message", "Task Assigned Successfully");
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    } else {
        response.put("success", false);
        response.put("message", "Error assigning task");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
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
public ResponseEntity<byte[]> updateUserImage(
    @PathVariable("id") int userId,
    @RequestParam("image") MultipartFile image) {
 
    try {
        // 1. Get image bytes and content type
        byte[] imageBytes = image.getBytes();
        String contentType = image.getContentType();
 
        // 2. Update user image in database (existing logic)
        userService.updateUserImage(userId, imageBytes);
 
        // 3. Prepare response with dynamic content type
        HttpHeaders headers = new HttpHeaders();
        // Set content type from the uploaded file
        if (contentType != null && contentType.startsWith("image/")) {
            headers.setContentType(MediaType.parseMediaType(contentType));
        } else {
            // Fallback to octet-stream if type detection fails
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        }
        headers.setContentLength(imageBytes.length);
        // 4. Return the image bytes with proper headers

        System.out.println("---" + imageBytes);

        return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
               .body(("Error updating user image: " + e.getMessage()).getBytes());
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
