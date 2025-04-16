package com.example.taskmanagementsystem.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.taskmanagementsystem.Models.Task;
import com.example.taskmanagementsystem.Models.TaskProgress;

@Repository
public interface TaskRepository extends JpaRepository<Task,Long>{
	  public List<Task> findByAssignedBy(int id);
	  public List<Task> findByAssignedTo(int id);
	  

}
