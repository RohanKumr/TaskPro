package com.example.taskmanagementsystem.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.taskmanagementsystem.Models.Task;
import com.example.taskmanagementsystem.Models.TaskProgress;

@Repository
public interface TaskRepository extends JpaRepository<Task,Long>{
	  public List<Task> findByAssignedBy(int id);
	  public List<Task> findByAssignedTo(int id);


    @Query("SELECT t FROM Task t WHERE " +
       "LOWER(t.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
       "LOWER(t.category) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
       "LOWER(t.subcategory) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
       "LOWER(t.priority) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Task> searchTasks(@Param("keyword") String keyword);

}
