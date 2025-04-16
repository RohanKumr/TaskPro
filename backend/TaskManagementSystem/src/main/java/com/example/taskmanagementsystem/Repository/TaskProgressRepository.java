package com.example.taskmanagementsystem.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.taskmanagementsystem.Models.TaskProgress;

public interface TaskProgressRepository extends JpaRepository<TaskProgress,Long> {
	   public List<TaskProgress> findByTaskid(Long id);
	   public Optional<TaskProgress> findById(Long id);


}
